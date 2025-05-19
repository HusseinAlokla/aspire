from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import media

app = FastAPI()

# CORS setup for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration
app.include_router(media.router)
from app.routes import ai_description
app.include_router(ai_description.router)
