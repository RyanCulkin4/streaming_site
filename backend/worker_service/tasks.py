from celery_worker import celery
from utils.ffmpeg_utils import convert_to_av1

@celery.task
def process_video(input_path, output_path, resolution="1080p"):
    return convert_to_av1(input_path, output_path, resolution)
