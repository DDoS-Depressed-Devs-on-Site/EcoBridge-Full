import traceback
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session
from src.database.table_models import Hub
from src.database.database import create_connection

router = APIRouter(
    prefix="/hubs",
    tags=["hubs"]
    )

# get all hubs
@router.get("/get_all")
async def get_all_hubs():
    session: Session = create_connection()
    try:
        all_hub = session.query(Hub).all()
        return {"Success": all_hub}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()