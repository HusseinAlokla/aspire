

# app/routes/ai_description.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

class DescriptionRequest(BaseModel):
    title: str
    genre: str

@router.post("/describe")
async def generate_description(data: DescriptionRequest):
    if not COHERE_API_KEY:
        raise HTTPException(status_code=500, detail="Cohere API key not found")

    prompt = f"Generate a short, creative description for a {data.genre} titled '{data.title}':"

    response = requests.post(
        "https://api.cohere.ai/v1/generate",
        headers={"Authorization": f"Bearer {COHERE_API_KEY}"},
        json={
            "model": "command",
            "prompt": prompt,
            "max_tokens": 50,
            "temperature": 0.9
        }
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    description = response.json()["generations"][0]["text"].strip()
    return {"description": description}