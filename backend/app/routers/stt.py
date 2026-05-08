from fastapi import APIRouter, UploadFile, File
import uuid
import os

from app.tasks.transcribe import transcribe_task

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def stt(file: UploadFile = File(...)):
    filename = f"{uuid.uuid4()}.webm"
    filepath = os.path.join(UPLOAD_DIR, filename)

    # 파일 저장
    with open(filepath, "wb") as f:
        f.write(await file.read())

    # celery task 실행
    task = transcribe_task.delay(filepath)

    return {"task_id": task.id}
