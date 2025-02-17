#!/usr/bin/env bash

# Wait for the database to be ready
until docker exec rag_postgres pg_isready -U postgres; do
  >&2 echo "Waiting for Postgres..."
  sleep 2
done

# Enable the vector extension
docker exec rag_postgres psql -U postgres -d postgres -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Migrate the database
docker exec rag_backend python manage.py migrate

# Restart the backend
docker-compose restart backend 