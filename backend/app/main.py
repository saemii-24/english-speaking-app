from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routers import sentences, tts

app = FastAPI(title="English Speaking Trainer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(sentences.router, prefix="/api/sentences", tags=["sentences"])
app.include_router(tts.router, prefix="/api/tts", tags=["tts"])


@app.get("/")
def health_check():
    return {"message": "Backend is running"}
