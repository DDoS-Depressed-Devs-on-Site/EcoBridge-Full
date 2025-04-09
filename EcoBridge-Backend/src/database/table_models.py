from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func, Float, LargeBinary
import base64
from sqlalchemy.orm import relationship
from src.database.database import Base, engine


class User(Base):
    __tablename__ = "users"

    # attributes
    picture = Column(LargeBinary, nullable=False)
    cover_photo = Column(LargeBinary, nullable=False)

    pub_key = Column(String(128), primary_key=True, unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(2000), nullable=False)

    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)
    address = Column(String(200), nullable=False)
    contact_information = Column(String(2000), nullable=False) # json
    eco_points = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())

    rank = Column(String(10), ForeignKey("ranks.rank_id"))

    def with_b64_img(self):
        self.picture = base64.b64encode(self.picture).decode("utf-8")
        self.cover_photo = base64.b64encode(self.cover_photo).decode("utf-8")

        return self

class Organization(Base):
    __tablename__ = "organizations"

    # attributes
    picture = Column(LargeBinary, nullable=False)
    cover_photo = Column(LargeBinary, nullable=False)

    pub_key = Column(String(128), primary_key=True, unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(2000), nullable=False)

    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)

    address = Column(String(200), nullable=False)
    latitude = Column(Float, nullable=False)
    Longitude = Column(Float, nullable=False)

    contact_information_json = Column(String(1000), nullable=False) 

    created_at = Column(DateTime, server_default=func.now())
    verification_status = Column(String(100), nullable=False, default="Not Verified")

    population = Column(Integer, default=0)
    average_food_consumption = Column(Integer, default=0)
    average_water_consumption = Column(Integer, default=0)
    average_clothing_consumption = Column(Integer, default=0)

    def with_b64_img(self):
        self.picture = base64.b64encode(self.picture).decode("utf-8")
        self.cover_photo = base64.b64encode(self.cover_photo).decode("utf-8")

        return self

class Hub(Base):
    __tablename__ = "hubs"

    pub_key = Column(String(128), primary_key=True, unique=True, nullable=False)
    name = Column(String(100), nullable=False)

    address = Column(String(200), nullable=False)
    latitude = Column(Float, nullable=False)
    Longitude = Column(Float, nullable=False)

    contact_information_json = Column(String(10), nullable=False) 

class Rank(Base):
    __tablename__ = "ranks"

    rank_id = Column(String(10), primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    min_points = Column(Integer, default=-1)
    max_points = Column(Integer, default=-1)
    icon = Column(LargeBinary, nullable=False)

class Badges(Base):
    __tablename__ = "badges"

    badge_id = Column(String(10), primary_key=True, unique=True)
    name = Column(String(100), unique=True)
    description = Column(String(2000))
    requirements_json = Column(String(2000)) 
    icon = Column(LargeBinary, nullable=False)

class UserBadges(Base):
    __tablename__ = "userbadges"

    badge_id = Column(String(10), ForeignKey("badges.badge_id"), primary_key=True)
    user_pub_key = Column(String(128), ForeignKey("users.pub_key"), primary_key=True)
    earned_at =  Column(DateTime, server_default=func.now())

class Inventory(Base):
    __tablename__ = "inventory"

    inventory_id = Column(String(100), primary_key=True)
    tracking_no = Column(String(10), nullable=False)
    organization_pub_key = Column(String(128), ForeignKey("organizations.pub_key"), nullable=False)
    sender_pub_key = Column(String(128))
    category = Column(String(50), nullable=False)
    item_name = Column(String(100), nullable=False)
    qty = Column(Integer, default=1)
    obtained_in = Column(DateTime, server_default=func.now())

class Inventoryhistory(Base):
    __tablename__ = "inventory_history"

    inventory_id = Column(String(100), ForeignKey("inventory.inventory_id"), primary_key=True, unique=False)
    qty_before_change = Column(Integer)
    change_in_qty = Column(Integer, default=1)
    qty_after_change = Column(Integer)
    date = Column(DateTime, server_default=func.now(), primary_key=True, unique=False)
    date_obtained = Column(DateTime, server_default=func.now())

class Request(Base):
    __tablename__ = "request"

    request_id = Column(String(100), primary_key=True)
    organization_pub_key = Column(String(128), ForeignKey("organizations.pub_key"), nullable=False)
    category = Column(String(50), nullable=False)
    item_name = Column(String(100), nullable=False)
    qty = Column(Integer, default=1)
    requested_date = Column(DateTime, server_default=func.now())

    



