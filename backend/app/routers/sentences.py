from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def test_router():
    return {"msg": "sentences router working"}
