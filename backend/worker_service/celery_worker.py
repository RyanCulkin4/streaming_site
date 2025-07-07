from celery import Celery

celery = Celery(
    "worker",
    broker="redis://cache_service:6379/0",
    backend="redis://cache_service:6379/0"
)

celery.conf.update(
    task_routes={
        "tasks.*": {"queue": "media"}
    }
)
