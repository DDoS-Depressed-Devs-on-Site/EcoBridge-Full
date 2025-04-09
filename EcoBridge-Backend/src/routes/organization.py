from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from src.database.database import create_connection
from src.database.table_models import Organization, Badges, Inventory, Inventoryhistory, Request
from src.core.generate_id import generate_inventory_id, generate_request_id, generate_key_pair
import traceback
from sqlalchemy import desc

router = APIRouter(prefix="/organization", tags={"Organization"})


class SignupRequest(BaseModel):
    name: str
    description: str
    username: str
    password: str
    email: str

    address: str
    latitude: float
    longitude: float

    contact_information_json: str

    population: int
    average_food_consumption: int 
    average_water_consumption: int
    average_clothing_consumption: int

class LoginRequest(BaseModel):
    email: str
    password: str

class AddInventoryRequest(BaseModel):
    tracking_no: str
    organization_pub_key: str
    sender_pub_key: str
    category: str
    item_name: str
    qty: int 

class UpdateInventoryRequest(BaseModel):
    inventory_id: str
    new_qty: int 

class AddRequestRequest(BaseModel):
    organization_pub_key: str
    category: str
    item_name: str
    qty:int 

class UpdateRequestRequest(BaseModel):
    request_id: str
    new_qty:int 

from typing import Annotated
import json
@router.post("/signup")
async def signup_organization(
    request: Annotated[str, Form()],
    picture: UploadFile = File(...),
    cover_photo: UploadFile = File(...)
    ):

    request: SignupRequest = SignupRequest(**json.loads(request))

    session = create_connection()
    try:
        [prv_key, pub_key] = generate_key_pair()

        picture = await picture.read()
        cover_photo = await cover_photo.read()

        organization = Organization(
            picture=picture,
            cover_photo=cover_photo,
            pub_key=pub_key,
            name=request.name,
            description=request.description,
            username=request.username,
            password=request.password,
            email=request.email,
            address=request.address,
            latitude=request.latitude,
            Longitude=request.longitude,
            contact_information_json=request.contact_information_json,
            population=request.population,
            average_food_consumption=request.average_clothing_consumption,
            average_water_consumption=request.average_water_consumption,
            average_clothing_consumption=request.average_clothing_consumption
        )

        session.add(organization)
        session.commit()

        return {"message": "Successfully created organization", "organization": organization, "key_pair": {"prv_key": prv_key, "pub_key": pub_key}}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/login")
async def login_organization(request: LoginRequest):
    session = create_connection()
    try:
        organization = session.query(Organization).where(Organization.email == request.email and Organization.password == request.password).first()

        if not organization:
            return HTTPException(404, {"error": "Organization not found"})
        
        return {"message": "Login Success", "organization": organization.with_b64_img()}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()


@router.get("/get-all")
async def get_organizations():
    session = create_connection()
    try:
        organizations = session.query(Organization).all()

        return {"organizations": [org.with_b64_img() for org in organizations]}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()


@router.get("/get")
async def get_organization(pub_key: str):
    session = create_connection()
    try:
        organization = session.query(Organization).where(Organization.pub_key == pub_key).one()
        if not organization:
            return HTTPException(404, {"error": "Organization not found"})

        return {"organization": organization.with_b64_img()}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/search")
async def search_by_name(name:str):
    session = create_connection()
    try:
        organizations = session.query(Organization).filter(Organization.name.like(f"%{name}%")).all()

        return {"organizations": [org.with_b64_img() for org in organizations]}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/rank")
async def get_rank(pub_key: str):
    session = create_connection()
    try:
        ...
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/badges")
async def get_badges(pub_key:str):
    session = create_connection()
    try:
        ...
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/inventory")
async def get_inventory(pub_key: str):
    session = create_connection()
    try:
        inventory = session.query(Inventory).where(Inventory.organization_pub_key == pub_key).all()

        return inventory

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/inventory/add")
async def add_inventory(request: AddInventoryRequest):
    session = create_connection()
    try:
        id = generate_inventory_id()
        if id == -1:
            print("Failed generating id")
            return HTTPException(500, {"error": "Internal Server Error"})

        inventory = Inventory(
            inventory_id=id, 
            tracking_no=request.tracking_no,
            organization_pub_key=request.organization_pub_key,
            sender_pub_key=request.sender_pub_key,
            category=request.category,
            item_name=request.item_name,
            qty=request.qty
        )

        inventory_history = Inventoryhistory(
            inventory_id=id,
            qty_before_change = 0,
            change_in_qty=request.qty,
            qty_after_change = request.qty
        )

        session.add(inventory)
        session.add(inventory_history)
        session.commit()

        return {"message": "Successfully added inventory item", "inventory": inventory}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/inventory/update")
async def update_inventory(request: UpdateInventoryRequest):
    session = create_connection()
    try:
        inventory = session.query(Inventory).where(Inventory.inventory_id == request.inventory_id).one()
        if not inventory:
            return HTTPException(404, {"error": "Inventory item not found"})
        

        inventory_history = Inventoryhistory(
            inventory_id=inventory.inventory_id,
            qty_before_change = inventory.qty,
            change_in_qty=request.new_qty - inventory.qty,
            qty_after_change = request.new_qty
        )

        inventory.qty = request.new_qty

        session.add(inventory_history)
        session.commit()

        return {"message": "Successfully updated inventory", "inventory": inventory}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/inventory/history")
async def get_history(inventory_id: str):
    session = create_connection()
    try:
        history = session.query(Inventoryhistory).where(Inventoryhistory.inventory_id == inventory_id).order_by(desc(Inventoryhistory.date)).all()

        return {"history": history}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.get("/request")
async def get_requests(pub_key: str):
    session = create_connection()
    try:
        requests = session.query(Request).where(Request.organization_pub_key == pub_key).all()

        return {"requests": requests}

    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/request/add")
async def add_request(request: AddRequestRequest):
    session = create_connection()
    try:
        id = generate_request_id()
        if id == -1:
            print("Failed to generate request id")
            return HTTPException(500, {"error": "Internal Server Error"})
        
        request = Request(
            request_id=id,
            organization_pub_key=request.organization_pub_key,
            category=request.category,
            item_name=request.item_name,
            qty=request.qty,
        )

        session.add(request)
        session.commit()
        return {"message": "Successfully added request", "request": request}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

@router.post("/request/update")
async def update_request(request_: UpdateRequestRequest):
    session = create_connection()
    try:
        request = session.query(Request).where(Request.request_id == request_.request_id).one()
        if not request:
            return HTTPException(404, {"error": "Inventory item not found"})
        
        request.qty = request_.new_qty

        session.commit()
        return {"message": "Successfully updated request", "request": request}
    except Exception as e:
        print(traceback.format_exc())
        return HTTPException(500, {"error": "Internal Server Error"})
    finally:
        session.close()

