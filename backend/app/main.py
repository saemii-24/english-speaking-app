from fastapi import FastAPI
from app.routers import sentences

app = FastAPI(title="English Speaking Trainer API")

app.include_router(sentences.router, prefix="/api/sentences", tags=["sentences"])


@app.get("/")
def health_check():
    return {"message": "Backend is running"}
