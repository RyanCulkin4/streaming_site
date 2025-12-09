import os
from celery import Celery

BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/1")

celery_app = Celery(
    "video_worker",
    broker=BROKER_URL,
    backend=RESULT_BACKEND,
    include=["worker.tasks.transcode", "worker.tasks.thumbnails"],
)

# Basic settings
celery_app.conf.update(
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_time_limit=60 * 60 * 12,  # long AV1 encodes
)
