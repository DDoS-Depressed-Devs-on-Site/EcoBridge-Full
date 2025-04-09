from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Request, HTTPException, Response
from src.node import Node
from src.transaction import Transaction, Item, generate_unique_tracking_number
from src.block import Block
import uvicorn
import argparse
import os
import json
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

node: Node

class CreateTransaction(BaseModel):
    sender_pub_key: str
    sender_prv_key: str
    reciever_pub_ky: str
    items: list[Item]

@app.post("/transaction/create/new")
async def create_transaction(request: CreateTransaction):
    try:
        transaction_json = {
        "transaction_hash": "",
        "sender_pub_key": request.sender_pub_key,
        "reciever_pub_key": request.reciever_pub_ky,
        "tracking_no": "0",
        "timestamp": int(time.time()),
        "estemated_time_delivered": int(time.time()),
        "urgency": "Urgent",

        "curr_state": {
            "hub_id": "0",
            "status": "Pending",
            "handler": ""
        },

        "items": request.items,

        "prev_block_hash": "0",
        "prev_transaction_hash": "0",
        "signature": ""
        }


        transaction = Transaction(**transaction_json)
        transaction.sign(request.sender_prv_key)
        transaction.validate()

        while transaction.tracking_no == "0":
            transaction.tracking_no = generate_unique_tracking_number()

        is_new_block = node.recieve_transaction(transaction)
        if is_new_block:
            return {"message": "Transaction added to new block", "tracking_no": transaction.tracking_no, "hash": transaction.transaction_hash}

        node.broadcast_transaction(transaction)

        return {"message": "Transaction added to queue", "tracking_no": transaction.tracking_no, "hash": transaction.transaction_hash}
    except Exception as e :
        raise HTTPException(400, {"message": "failed to add transaction", "detail": e })
 

@app.post("/transaction/create")
async def create_transaction(transaction: Transaction):
   
    try:
        transaction.validate()

        while transaction.tracking_no == "0":
            transaction.tracking_no = generate_unique_tracking_number()

        is_new_block = node.recieve_transaction(transaction)
        if is_new_block:
            return {"message": "Transaction added to new block", "tracking_no": transaction.tracking_no, "hash": transaction.transaction_hash}

        node.broadcast_transaction(transaction)

        return {"message": "Transaction added to queue", "tracking_no": transaction.tracking_no, "hash": transaction.transaction_hash}
    except Exception as e :
        raise HTTPException(400, {"message": "failed to add transaction", "detail": e })
    
def get_block_(block_hash):
    BLOCKS_DIR = "blks"
    block_path = os.path.join(BLOCKS_DIR, block_hash)

    try:
        with open(block_path, mode='r') as f:
            content = f.read()
            block_data = json.loads(content)
            return Block(**block_data)
    except FileNotFoundError:
        HTTPException(404, {"error": "Blockfile not found"})
    except json.JSONDecodeError:
        HTTPException(500, {"error": "Blockfile corrupted"})
    
@app.get("/get-all-sent-transactions-tracking-number/{user_pub_key}")
async def get_user_send_tracking_numbers(user_pub_key: str):
    tracking_numbers = []

    curr_block = node.latest_block
    while True:
        for transaction in curr_block.transactions:
            if transaction.sender_pub_key == user_pub_key and transaction.tracking_no not in tracking_numbers:
                tracking_numbers.append(transaction.tracking_no)
        
        if curr_block.prev_block_hash == "0":
            break
        curr_block = get_block_(curr_block.prev_block_hash)
    
    return {"tracking_no": tracking_numbers}

@app.get("/get-all-recieved-transactions-tracking-number/{user_pub_key}")
async def get_user_send_tracking_numbers(user_pub_key: str):
    tracking_numbers = []

    curr_block = node.latest_block
    while True:
        for transaction in curr_block.transactions:
            if transaction.reciever_pub_key == user_pub_key and transaction.tracking_no not in tracking_numbers:
                tracking_numbers.append(transaction.tracking_no)
        
        if curr_block.prev_block_hash == "0":
            break
        curr_block = get_block_(curr_block.prev_block_hash)
    return {"tracking_no": tracking_numbers}

@app.get("/transactions/get/latest")
async def get_latest_transactions():
    limit = 10
    transactions = []

    curr_block = node.latest_block
    while True:
        for transaction in curr_block.transactions:
            transactions.append(transaction)
            if len(transactions) >= limit:
                return {"transactions": transactions}
        
        if curr_block.prev_block_hash == "0":
            break
        curr_block = get_block_(curr_block.prev_block_hash)
    return {"transactions": transactions}
    
    

@app.get("/transaction/get/{tracking_no}")
async def get_transaction(trackin_no: str):
    transactions = []
    curr_transaction: Transaction = None
    curr_block = node.latest_block
    while curr_transaction == None: 

        for transaction in curr_block.transactions:
            if transaction.tracking_no == trackin_no:
                curr_transaction = transaction
                break

        if curr_block.prev_block_hash == 0:
            return HTTPException(404, {"error": "Tracking number not found"})
        
        curr_block = get_block_(curr_block.prev_block_hash)
    
    curr_block = node.latest_block
    transactions.append(curr_transaction)
    while curr_transaction.prev_transaction_hash != "0":
        for transaction in curr_block.transactions:
            if transaction.hash() == curr_transaction.prev_transaction_hash:
                curr_transaction = transaction
                transactions.append(curr_transaction)

                if curr_transaction.prev_transaction_hash == "0":
                    break
        
        if curr_block.prev_block_hash == "0":
            break
        curr_block = get_block_(curr_block.prev_block_hash)
    
    return {"tracking_no": trackin_no, "history": transactions}


@app.get("/block/get/{blockhash}")
async def get_block_info(blockhash: str):
    if blockhash == node.latest_block.block_hash:
        return {"block_hash": blockhash, "block": node.latest_block}
    
    block = get_block_(blockhash)
    return {"block_hash": blockhash, "block": block}


@app.get("/block")
async def test():
    return {"block": node.latest_block}
    
@app.post("/gossip-transaction")
async def recieve_proposed_block(request: Request, transaction: Transaction):
    client_host = request.client.host
    if client_host not in ("127.0.0.1", "::1"):
        raise HTTPException(status_code=403, detail="Forbidden")

    node.recieve_transaction(transaction)

    return {"is_valid": True}

@app.post("/propose-block")
async def recieve_proposed_block(request: Request, block: Block):
    client_host = request.client.host
    if client_host not in ("127.0.0.1", "::1"):
        raise HTTPException(status_code=403, detail="Forbidden: Localhost only")
    
    node.latest_block.write_to_disk()
    with open("./latest_block.txt", "w") as file:
        file.write(node.latest_block.block_hash)


    node.latest_block = block
    node.transaction_pool.clear()

    print("New block Created: ", node.latest_block.block_hash)
    return {"is_valid": True, "block_hash": node.latest_block.block_hash}


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1", help="Host to run on")
    parser.add_argument("--port", type=int, default=8000, help="Port to run on")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload")
    parser.add_argument("--node2host", default="127.0.0.1", help="Node2 host")
    parser.add_argument("--node2port", type=int, default=8081, help="Node2 port")
    return parser.parse_args()

args = parse_args()
node = Node(args.node2host, args.node2port)


import threading
import time

# to prevent cmd from sleeping
def heartbeat():
    while True:
        print(f"[{time.time()}]", flush=True)
        time.sleep(2)


if __name__ == "__main__":
    threading.Thread(target=heartbeat, daemon=True).start()

    uvicorn.run("main:app", host=args.host, port=args.port, reload=True)