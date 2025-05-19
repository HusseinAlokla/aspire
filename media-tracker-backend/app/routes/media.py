from fastapi import APIRouter, HTTPException
from typing import List
from app.models import MediaItem
from app.db import db

router = APIRouter()

@router.get("/media", response_model=List[MediaItem])
async def get_media():
    items = await db.media.find().to_list(100)
    return items

@router.post("/media", response_model=MediaItem)
async def add_media(item: MediaItem):
    await db.media.insert_one(item.dict())
    return item

@router.delete("/media/{item_id}")
async def delete_media(item_id: int):
    result = await db.media.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Deleted"}

@router.put("/media/{item_id}", response_model=MediaItem)
async def update_media(item_id: int, item: MediaItem):
    existing = await db.media.find_one({"id": item_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Item not found")
    
    await db.media.replace_one({"id": item_id}, item.dict())
    return item
