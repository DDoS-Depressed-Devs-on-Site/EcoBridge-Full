from src.database.database import Base, engine, create_connection
from sqlalchemy import text
import src.database.table_models

def init():
    print("Initializing database")
    Base.metadata.create_all(bind=engine)
    print("tables created success")