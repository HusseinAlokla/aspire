from pydantic import BaseModel

class MediaItem(BaseModel):
    id: int
    title: str
    creator: str
    releaseDate: str
    genre: str
    status: str
