from rest_framework.response import Response
from rest_framework import status, generics
from .models import Document
from .serializers import DocumentSerializer
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Document, Query
import openai
import os
import numpy as np

class DocumentUploadView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def create(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        document = Document.objects.create(file=file_obj)
        document.save() # Triggers text extraction & embedding generation

        serializer = self.get_serializer(document)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class QueryView(APIView):
    def post(self, request):
        user_query = request.data.get("query", "").strip()
        if not user_query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Generate embedding for user query
        query = Query.objects.create(text=user_query)
        query.embedding = query.generate_embedding()
        query.save()

        if query.embedding is None:
            return Response({"error": "Failed to generate embedding"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # ✅ Perform vector search with TWO THRESHOLDS
        with connection.cursor() as cursor:
            # **Stage 1: STRICT search for highly relevant documents**
            cursor.execute(
                """
                SELECT id, text, embedding <-> %s::vector AS distance
                FROM documents_document
                WHERE embedding <-> %s::vector < 0.7  -- ✅ Very strict threshold for strong matches
                ORDER BY distance
                LIMIT 5;
                """,
                [query.embedding, query.embedding]
            )
            strict_results = cursor.fetchall()

        retrieved_texts = [result[1] for result in strict_results if result[1]]

        # ✅ If no strict matches found, perform a more relaxed search
        if not retrieved_texts:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, text, embedding <-> %s::vector AS distance
                    FROM documents_document
                    WHERE embedding <-> %s::vector < 1.3  -- ✅ Looser threshold for broader matches
                    ORDER BY distance
                    LIMIT 5;
                    """,
                    [query.embedding, query.embedding]
                )
                relaxed_results = cursor.fetchall()

            retrieved_texts = [result[1] for result in relaxed_results if result[1]]

        # ✅ If **STILL** no relevant documents, trigger fallback
        if not retrieved_texts:
            return self.fallback_to_llm(user_query)

        # ✅ Construct augmented prompt for LLM
        context_text = "\n\n".join(retrieved_texts)
        prompt = f"Answer the following based on the provided documents:\n\nContext:\n{context_text}\n\nUser Question: {user_query}"

        # ✅ Generate final response with OpenAI
        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ]
            )
            llm_response = response.choices[0].message.content
        except Exception as e:
            return Response({"error": f"OpenAI API Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # ✅ Store response in DB
        query.response = llm_response
        query.save()

        return Response({"response": llm_response, "source": "RAG (Vector Search)"}, status=status.HTTP_200_OK)

    # ✅ Fallback mechanism when no relevant documents are found
    def fallback_to_llm(self, user_query):
        print("⚠️ No relevant text found in vector search. Switching to LLM.")

        client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant answering healthcare queries."},
                    {"role": "user", "content": user_query}
                ]
            )
            llm_response = response.choices[0].message.content

        except Exception as e:
            return Response({"error": f"OpenAI API Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"response": llm_response, "source": "Direct LLM"}, status=status.HTTP_200_OK)
