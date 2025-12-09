from celery import shared_task
from pathlib import Path
from PIL import Image
import subprocess, shlex, tempfile

@shared_task(bind=True)
def extract_thumbnail(self, input_path: str, output_path: str, at_seconds: int = 30, width: int = 640):
    """
    Extract a thumbnail using ffmpeg for precise seeking; resize with Pillow.
    """
    input_p = Path(input_path)
    output_p = Path(output_path)

    if not input_p.exists():
        raise FileNotFoundError(f"Input not found: {input_p}")

    output_p.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td, "frame.jpg")
        cmd = f'ffmpeg -y -ss {at_seconds} -i "{input_p}" -frames:v 1 "{tmp}"'
        subprocess.check_call(shlex.split(cmd), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

        img = Image.open(tmp)
        h = int(img.height * (width / img.width))
        img = img.resize((width, h), Image.LANCZOS)
        img.save(output_p, quality=92)

    return str(output_p)
