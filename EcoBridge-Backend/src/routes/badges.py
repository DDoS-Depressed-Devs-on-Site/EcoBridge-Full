import json
import traceback
from typing import Annotated
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from src.database.table_models import Badges, UserBadges, User
from src.database.database import create_connection
from pydantic import BaseModel

router = APIRouter(
    prefix="/badges",
    tags=["badges"]
    )

class make_badge(BaseModel):
    badge_id: str
    name: str
    description: str
    requirements_json: str

#ONLY USE IF GOING TO ADD A BADGE
# @router.post("/create")
# async def make_Badge(create_data: Annotated[str,Form()], icon: UploadFile=File(...)):
#     session: Session = create_connection()
#     try:
#         icon_binary = await icon.read()
#         created_data:make_badge = make_badge(**json.loads(create_data))
#         created_badge = Badges(badge_id=created_data.badge_id, name=created_data.name,
#                             description = created_data.description,
#                             requirements_json = created_data.requirements_json, icon=icon_binary)
#         session.add(created_badge)
#         session.commit()
#         return{"Succes":"Badge has been created"}
#     except Exception as e:
#         print(traceback.format_exc())
#         return HTTPException(500,{"error": "Internal Server Error"})
#     finally:
#         session.close()

# # FOR TESTING PURPOSES
# @router.get("/get_all")
# async def get_all_badges_no_icon():
#     session: Session = create_connection()
#     try:
#         badges = session.query(Badges).all()
#         serialized_badges = [
#             {
#                 "badge_id": badge.badge_id,
#                 "name": badge.name,
#                 "description": badge.description,
#                 "requirements_json": badge.requirements_json
#             }
#             for badge in badges
#         ]
#         return {"Success": serialized_badges}
#     except Exception as e:
#         print(traceback.format_exc())
#         return HTTPException(500, {"error": "Internal Server Error"})
#     finally:
#         session.close()
##--------------------------------------------------------------------------

# get all badges
@router.get("/get_all")
async def get_all_badges():
    session: Session = create_connection()

    try:
        badge=session.query(Badges).all()
        return{"Success":badge}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# get badge information
@router.get("/get_badge/{badge_id}")
async def get_badge(badge_id : str):
    session: Session = create_connection()
    try:
        badge=session.query(Badges).filter(Badges.badge_id == badge_id).first()

        if badge is None:
            raise HTTPException(status_code=404, detail="Rank not found")
        return {column.name: getattr(badge, column.name) for column in Badges.__table__.columns}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/add_badge")
async def give_badge(badge_id: str, user_pub_key: str):
    session: Session = create_connection()
    try:
        added_badge = UserBadges(badge_id = badge_id, user_pub_key = user_pub_key)
        badge = session.query(Badges).filter(Badges.badge_id == badge_id).first()
        user = session.query(User).filter(User.pub_key == user_pub_key).first()

        session.add(added_badge)
        session.commit()
        return {"Success": f"Badge: {badge.name} to {user.username}"}
    except:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()