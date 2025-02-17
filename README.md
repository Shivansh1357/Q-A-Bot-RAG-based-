#  RAG-based Q&A Chatbot

This is a **Retrieval-Augmented Generation (RAG) based AI chatbot** designed for **Neurality Health**. It allows users to upload documents, store them as vector embeddings using **pgvector**, and perform **semantic search** to answer queries efficiently.

---

## 🚀 Features

- **Document Upload & Processing**: Extracts text from PDFs and generates **OpenAI embeddings**.
- **Vector Search Optimization**: Uses **pgvector** with **indexed queries** for **fast retrieval**.
- **Hybrid AI Query Handling**: Answers **based on vector search** or **fallbacks to LLM (GPT-4)**.
- **Fully Containerized**: Uses **Docker & Docker Compose** for **easy deployment**.


---

## 📂 Project Structure

```
├── frontend/           # Next.js frontend for UI
├── backend/            # Django backend with API endpoints
├── docker-compose.yml  # Docker Compose setup for full stack
├── README.md           # Setup and documentation
```

---

## 🛠️ Setup Guide

### Prerequisites

Ensure you have the following installed:

- **Docker** & **Docker Compose**
- **pnpm** (for frontend)
- **Python 3.10+** (if running backend locally)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Shivansh1357/Q-A-Bot-RAG-based-.git
cd Q-A-Bot-RAG-based
```

### 2️⃣ Set Up Environment Variables

#### Backend `.env`

```sh
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=4252
POSTGRES_HOST=db
POSTGRES_PORT=5432
DATABASE_URL=postgres://postgres:4252@db:5432/postgres
OPENAI_API_KEY=your-openai-key
```

#### Frontend `.env`

```sh
NEXT_PUBLIC_BASE_URL=http://127.0.0.1:8034/api
```

### 3️⃣ Start the Application

#### 🚀 Run the app with Docker

```sh
docker-compose up --build -d
```

This will:

1. Start **PostgreSQL with pgvector** (`rag_postgres`).
2. Start the **Django backend** (`rag_backend`) and run migrations automatically.
3. Start the **Next.js frontend** (`rag_frontend`).

Once running,

### 4️⃣ Important: Enable Vector Extension

After starting the containers, execute the following script to enable the `vector` extension and migrate the database:

1. Run the setup script:

   ```sh
   ./setup-vector.sh
   ```

This step is crucial for enabling vector search capabilities in the database.

---


Once running, access:

- **Frontend:** `http://localhost:3058`
- **Backend API:** `http://localhost:8034/api`
- **Database (pgvector):** `postgres://postgres:4252@localhost:5433/postgres`

## 🛠️ Testing API Endpoints

### ✅ **Upload Document**

```sh
curl -X POST http://127.0.0.1:8034/api/documents/upload/ -F "file=@yourfile.pdf"
```

### ✅ **Query Optimization Testing (Minimum Latency)**

```sh
curl -X POST http://127.0.0.1:8034/api/documents/query/ -H "Content-Type: application/json" -d '{"query": "What is deep learning?"}'
```

---

## 📌 Notes

- If you face issues with **Docker volumes**, reset with:
  ```sh
  docker-compose down -v
  docker-compose up --build
  ```
- Ensure **OpenAI API key** is valid and added to `.env` file.

---
