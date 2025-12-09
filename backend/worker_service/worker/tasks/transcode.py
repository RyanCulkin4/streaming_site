import os
import shlex
import subprocess
from pathlib import Path
from celery import shared_task

def _run(cmd: str) -> None:
    # Cross-platform safe execution
    subprocess.check_call(shlex.split(cmd), stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)

@shared_task(bind=True)
def transcode_to_av1(self, input_path: str, output_path: str, crf: int = 28, preset: str = "6"):
    """
    Transcode to AV1 using SVT-AV1 (recommended on Windows builds).
    - input_path: source video (any format ffmpeg can read)
    - output_path: .mkv or .mp4 target
    - crf: quality (lower = higher quality; 20–34 typical)
    - preset: 0–13 for SVT-AV1 (lower is slower/better)
    """
    in_p = Path(input_path)
    out_p = Path(output_path)

    if not in_p.exists():
        raise FileNotFoundError(f"Input not found: {in_p}")

    out_p.parent.mkdir(parents=True, exist_ok=True)

    # Video: SVT-AV1, 10-bit for better efficiency; Audio: OPUS
    # Change container to .mkv for broader AV1 support
    cmd = (
        f'ffmpeg -y -i "{in_p}" '
        f'-map 0:v:0 -pix_fmt yuv420p10le -c:v libsvtav1 -crf {crf} -preset {preset} '
        f'-map 0:a:0? -c:a libopus -b:a 128k '
        f'-map 0:s? -c:s copy '
        f'"{out_p}"'
    )

    _run(cmd)
    return str(out_p)
