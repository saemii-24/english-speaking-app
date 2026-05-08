from fastapi import APIRouter
import edge_tts
import uuid
import os

router = APIRouter()

# static 폴더 없으면 생성
os.makedirs("app/static", exist_ok=True)


@router.get("/")
async def generate_tts(text: str):
    filename = f"{uuid.uuid4()}.mp3"
    filepath = f"app/static/{filename}"

    communicate = edge_tts.Communicate(text=text, voice="ko-KR-SunHiNeural")

    await communicate.save(filepath)

    return {"audio_url": f"/static/{filename}"}
