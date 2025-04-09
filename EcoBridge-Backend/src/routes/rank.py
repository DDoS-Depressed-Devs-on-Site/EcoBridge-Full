import json
import traceback
from typing import Annotated
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from src.database.table_models import Rank
from src.database.database import create_connection
from pydantic import BaseModel

router = APIRouter(
    prefix="/rank",
    tags=["ranks"]
    )

class make_rank(BaseModel):
    rank_id:str
    name:str
    min_points:int
    max_points:int

# #ONLY USE IF GOING TO ADD A RANK
# @router.post("/create")
# async def make_Rank(create_data: Annotated[str,Form()], icon: UploadFile=File(...)):
#     session: Session = create_connection()
#     try:
#         icon_binary = await icon.read()
#         created_data:make_rank = make_rank(**json.loads(create_data))
#         created_rank = Rank(rank_id=created_data.rank_id, name=created_data.name,
#                             min_points=created_data.min_points,
#                             max_points=created_data.max_points, icon=icon_binary)
#         session.add(created_rank)
#         session.commit()
#         return{"Succes":"Rank has been created"}
#     except Exception as e:
#         print(traceback.format_exc())
#         return HTTPException(500,{"error": "Internal Server Error"})
#     finally:
#         session.close()
        
# get all ranks
@router.get("/get_all")
async def get_all_ranks():
    session : Session = create_connection()
    try:
        rank = session.query(Rank).all()
        return {"Success: " : rank}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()


# get rank information
@router.get("/get_rank/{rank_id}")
async def get_rank(rank_id : str):
    session : Session = create_connection()
    try:
        rank = session.query(Rank).filter(Rank.rank_id == rank_id).first()

        if rank is None:
            raise HTTPException(status_code=404, detail="Rank not found")
        return{"Success: ": "Rank fetched successfully", "rank": {
        "id": rank.rank_id,
        "name": rank.name,
        "min_points": rank.min_points,
        "max_points": rank.max_points
    }}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()
