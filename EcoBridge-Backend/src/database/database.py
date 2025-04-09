from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import traceback

DATABASE_URL = "mssql+pyodbc://ddos:dandanDan5@ddosserver.database.windows.net:1433/DDoSdatabase?driver=ODBC+Driver+17+for+SQL+Server"


# Set up the engine and session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker( bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

def create_connection():    
    db = SessionLocal()
    try: 
        return db
    except Exception as e:
        print("ERROR ESRABLISHING CONNECTION WITH DATABSE")
        print(traceback.format_exc())

