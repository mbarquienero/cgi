from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import os
import shutil
import uuid
from typing import Optional
import asyncio
import logging
from pathlib import Path

# nom install
# build: npx vite build
# npm run dev


# Import video generation module (would be implemented in a real application)
from video_generator import generate_video

# Create upload and output directories if they don't exist
UPLOAD_DIR = Path("uploads")
OUTPUT_DIR = Path("outputs")
UPLOAD_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)

app = FastAPI(title="CGI Ad Generator API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (generated videos)
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

@app.get("/")
async def root():
    return {"message": "CGI Ad Generator API is running"}

@app.post("/api/upload")
async def upload_image(
    file: UploadFile = File(...),
):
    """Endpoint to upload a product image."""
    # Generate a unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save the uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {
        "filename": unique_filename,
        "file_path": str(file_path),
        "message": "File uploaded successfully"
    }

@app.post("/api/generate")
async def generate_ad(
    filename: str = Form(...),
    effect: str = Form(...),
    duration: Optional[int] = Form(5)  # Default duration: 5 seconds
):
    """Endpoint to generate a video with the selected effect."""
    # Validate input
    file_path = UPLOAD_DIR / filename
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Uploaded file not found")
    
    # Generate a unique ID for the output video
    video_id = str(uuid.uuid4())
    output_path = OUTPUT_DIR / f"{video_id}.mp4"
    
    try:
        # Generate the video (this would call the actual video generation function)
        await generate_video(
            input_path=str(file_path),
            output_path=str(output_path),
            effect=effect,
            duration=duration
        )
        
        # Return the video details
        return {
            "video_id": video_id,
            "output_path": str(output_path),
            "download_url": f"/outputs/{video_id}.mp4",
            "message": "Video generated successfully"
        }
    except Exception as e:
        logging.error(f"Error generating video: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating video: {str(e)}")

@app.get("/api/video/{video_id}")
async def get_video(video_id: str):
    """Endpoint to retrieve a generated video."""
    video_path = OUTPUT_DIR / f"{video_id}.mp4"
    if not os.path.exists(video_path):
        raise HTTPException(status_code=404, detail="Video not found")
    
    return FileResponse(
        path=video_path,
        media_type="video/mp4",
        filename=f"cgi-ad-{video_id}.mp4"
    )

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)