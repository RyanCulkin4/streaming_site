FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# ffmpeg runtime for transcode tasks
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip wheel \
 && pip install --no-cache-dir -r requirements.txt

# Copy worker code
COPY worker ./worker

# Default command is provided from docker-compose 'command'
