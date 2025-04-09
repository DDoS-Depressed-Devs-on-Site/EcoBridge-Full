import datetime
import traceback
from pydantic import BaseModel
from fastapi import APIRouter, FastAPI, File, Form, HTTPException, UploadFile
from src.database.table_models import User, Rank, UserBadges
from src.database.database import create_connection
from sqlalchemy.orm import Session
from typing import Annotated
from src.core.generate_id import generate_key_pair
import json


class create_User(BaseModel):
    name: str
    username: str
    password: str
    email: str
    address: str
    contact_information: str
    description: str

class login_user(BaseModel):
    email: str
    password: str

router = APIRouter(
    prefix="/users",
    tags=["users"]
    )

# DEBUGGING PURPOSES
@router.get("/get_all_users")
async def get_all_users():
    session: Session = create_connection()
    try:
        users = session.query(User).all()
        serialized_users = [
            {
                "pub_key": user.pub_key,
                "password": user.password,
                "name": user.name,
                "username": user.username,
                "email": user.email,
                "address": user.address,
                "contact_information": user.contact_information,
                "eco_points": user.eco_points,
                "rank": user.rank,
                "created_at": user.created_at,
                "description": user.description
            }
            for user in users
        ]
        return {"Success": serialized_users}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

# signup
@router.post("/create")
async def create_user(create_data: Annotated[str,Form()],
                    picture: UploadFile = File(...),
                    cover_photo: UploadFile = File(...)):
    
    session: Session = create_connection()
    create_data_dict = json.loads(create_data)
    create_data_obj = create_User(**create_data_dict)

    try:
        is_existing = session.query(User).filter(User.email == create_data_obj.email).first()
        if is_existing:
            return {"message": "User with this email has already been registered"}
        
        [priv_key, public_key] = generate_key_pair()
        
        picture_binary = await picture.read()
        cover_photo_binary = await cover_photo.read()

        created_user = User(pub_key = public_key, name = create_data_obj.name, username = create_data_obj.username, password = create_data_obj.password,
                            email = create_data_obj.email, address = create_data_obj.address,
                            contact_information = create_data_obj.contact_information, eco_points = 0,
                            description = create_data_obj.description, picture = picture_binary,
                            cover_photo = cover_photo_binary)
        
        session.add(created_user)
        session.commit()
        return {"Success: ": "User fetched successfully", "User":{
        "private_key": priv_key,
        "public_key": created_user.pub_key,
        "name": created_user.name,
        "username": created_user.username,
        "email": created_user.email,
        "address": created_user.address,
        "contact_information": created_user.contact_information,
        "eco_points": created_user.eco_points,
        "rank": created_user.rank,
        "created_at": created_user.created_at
    }}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# login
@router.post("/login")
async def login(user_data: login_user):
    session: Session = create_connection()
    try:
        user = session.query(User).filter(User.email == user_data.email).first()
        if not user:
            return {"Error": "User not found!"}
        
        if user.password != user_data.password:
            return {"Error": "Password does not match!"}
        
        return {"user": user.with_b64_img()}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# get user data
@router.get("{pub_key}")
async def get_user_by_id(pub_key : str):
    session:Session = create_connection()
    try:
        user = session.query(User).filter(User.pub_key == pub_key).first()
        if not user:
            return {"Error": "User not found!"}
        return {"Success: ": "User fetched successfully", "User":{
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "address": user.address,
        "contact_information": user.contact_information,
        "eco_points": user.eco_points,
        "rank": user.rank,
        "created_at": user.created_at
    }}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# search user via name
@router.get("/{username}")
async def get_user_by_name(username: str):
    session: Session = create_connection()
    try:
        user = session.query(User).filter(User.username == username).first()
        if not user:
            return {"Error: ": "User not found!"}
        return {"Success: ": "User fetched successfully", "User": {
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "address": user.address,
        "contact_information": user.contact_information,
        "eco_points": user.eco_points,
        "rank": user.rank,
        "created_at": user.created_at
    }}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# get rank
@router.get("/get_rank")
async def get_user_rank(pub_key: str):
    session: Session = create_connection()
    try:
        session.query(User).filter(User.rank).first()
        return {"User Rank: " : User.rank}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# get rank icon
@router.get("/rank_icon")
async def get_rank_icon(rank_id: str):
    session: Session = create_connection()
    try:
        rank_icon = session.query(Rank.rank_id).filter(Rank.icon).first()
        return rank_icon
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()

# get user badges
@router.get("/badges")              #unsure how it works
async def get_user_badges():
    session: Session=create_connection()
    try:
        badges = session.query(UserBadges).all()
        return {"Success: " : badges}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500,{"error": "Internal Server Error"})
    finally:
        session.close()
