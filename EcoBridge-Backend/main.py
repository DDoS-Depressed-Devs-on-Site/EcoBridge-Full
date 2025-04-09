
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from src.routes import users,organization,hub,badges,rank

import socket
import traceback
from src.database.initialize_database import init
from src.routes import organization

import pyodbc
print(pyodbc.drivers())

# init()

app = FastAPI(
    title="Main API file",
    description="Connect all routers here",
    version="0.1"
)
app.include_router(organization.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(rank.router)
app.include_router(badges.router)
app.include_router(hub.router)

@app.get("/")
async def root():
    return {"test": "Hi"}


try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    print("\tTo connect to To You server use the following address")
    print("\t\tIPAddress:\t " + s.getsockname()[0])
    print("\t\tPort:\t\t 8000")
    print(f"\t\tURL:\t\t http://{s.getsockname()[0]}:8000")
    s.close()
except Exception as e:
    print(e)
    print(traceback.format_exc())

