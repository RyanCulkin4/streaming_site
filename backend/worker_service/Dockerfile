FROM python:3.11-slim

WORKDIR /app

# Install OS-level tools
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the code
COPY . .

# Run the Celery worker
CMD ["celery", "-A", "celery_worker.celery", "worker", "--loglevel=info"]
