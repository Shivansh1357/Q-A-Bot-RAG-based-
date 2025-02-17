import uuid
import os
import openai
import pdfplumber
from dotenv import load_dotenv
from django.db import models
from langchain.text_splitter import RecursiveCharacterTextSplitter
from pgvector.django import VectorField

load_dotenv()  # Load environment variables

class Document(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file = models.FileField(upload_to='uploads/')
    text = models.TextField(blank=True, null=True)
    embedding = VectorField(dimensions=1536, null=True, blank=True)  
    response = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def extract_text(self):
        """ Extracts text from the uploaded PDF file """
        text = ""
        try:
            with pdfplumber.open(self.file) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"

            # Split text into chunks using LangChain
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,  # Define chunk size
                chunk_overlap=50  # Allow small overlap for context
            )
            chunks = text_splitter.split_text(text)

            return "\n\n".join(chunks)  # Store extracted text as chunks
        except Exception as e:
            print(f"Error extracting text: {str(e)}")
            return None

    def generate_embedding(self):
        """ Generate embeddings using OpenAI API v1+ """
        if not self.text:
            return None

        try:
            client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # ✅ Corrected API usage
            response = client.embeddings.create(
                input=[self.text],  # ✅ Wrap input in a list
                model="text-embedding-3-small"
            )
            return response.data[0].embedding  # ✅ Returns list, no need for np.array()
        except Exception as e:
            print(f"OpenAI Embedding Error: {str(e)}")
            return None

    def save(self, *args, **kwargs):
        """ Override save method to extract and store text before saving """
        if not self.text:
            extracted_text = self.extract_text()
            if extracted_text:
                self.text = extracted_text

        if self.embedding is None:
            embedding_vector = self.generate_embedding()
            if embedding_vector is not None:
                self.embedding = embedding_vector  # ✅ No need for `.tolist()`, OpenAI returns a list

        super().save(*args, **kwargs)

    def __str__(self):
        return self.file.name


class Query(models.Model):
    id = models.AutoField(primary_key=True)
    text = models.TextField()  # Store the user query
    embedding = VectorField(dimensions=1536, null=True, blank=True)  # Store vector embeddings
    response = models.TextField(null=True, blank=True)  # Store generated response
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_embedding(self):
        """ Generate embeddings for the user query using OpenAI API v1+ """
        if not self.text:
            return None

        try:
            client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # ✅ Corrected API usage
            response = client.embeddings.create(
                input=[self.text],  # ✅ Wrap input in a list
                model="text-embedding-3-small"
            )
            return response.data[0].embedding  # ✅ Returns list, no need for np.array()
        except Exception as e:
            print(f"OpenAI Embedding Error: {str(e)}")
            return None

    def save(self, *args, **kwargs):
        """ Override save method to generate embeddings before saving """
        if self.embedding is None:
            embedding_vector = self.generate_embedding()
            if embedding_vector is not None:
                self.embedding = embedding_vector  # ✅ Store as a list, not NumPy array

        super().save(*args, **kwargs)
