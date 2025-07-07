import subprocess

def convert_to_av1(input_path, output_path, resolution="1080p"):
    resolution_map = {
        "1080p": "1920x1080",
        "720p": "1280x720",
        "480p": "854x480"
    }

    scale = resolution_map.get(resolution, "1280x720")

    command = [
        "ffmpeg", "-i", input_path,
        "-vf", f"scale={scale}",
        "-c:v", "libaom-av1",
        "-crf", "30",
        "-b:v", "0",
        "-strict", "experimental",
        output_path
    ]

    try:
        subprocess.run(command, check=True)
        return f"Conversion to {resolution} successful: {output_path}"
    except subprocess.CalledProcessError as e:
        return f"Error: {e}"
