
from src.transaction import Transaction
from src.block import Block
import os

import json

import requests

class Node:
    node2_host: str
    node2_port: int

    transaction_pool_size = 2 # no of transaction till node comes up with a block
    transaction_pool: list[Transaction] = []

    latest_block: Block


    def __init__(self, node2_host: str, node2_port: int):
        self.node2_host = node2_host
        self.node2_port = node2_port

        print("New node created with peer:")
        print(f"\t host: {self.node2_host}")
        print(f"\t port: {self.node2_port}")

        print("Creating a genesis block")
        self.latest_block = Block()
        self.latest_block.initialize("0", [])

        with open("./latest_block.txt", "r") as file:
            latest_block_hash = file.read()
            BLOCKS_DIR = "blks"
            block_path = os.path.join(BLOCKS_DIR, latest_block_hash)

            print(f"Latest Block hash: {latest_block_hash}")

            if(latest_block_hash != "0"):
                with open(block_path, mode='r') as f:
                    content = f.read()
                    block_data = json.loads(content)
                    self.latest_block =  Block(**block_data)
            print("No past blocks found creating new blockchain")
 

    def broadcast_transaction(self, transaction: Transaction):
        print("Gossiping about transaction: ", transaction.transaction_hash)
        response = requests.post(f"http://{self.node2_host}:{self.node2_port}/gossip-transaction", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
        
        response_dict = response.json()
        print(response_dict)

        if not response_dict["is_valid"]:
            self.transaction_pool.remove(transaction)
            raise Exception("Node 2 invalidated the transaction")
    
    def recieve_transaction(self, transaction: Transaction):
        self.transaction_pool.insert(0, transaction)

        if len(self.transaction_pool) >= self.transaction_pool_size:
            self.propose_block()
            return True
        return False


    def recieve_block(self, block: Block):
        if block.prev_block_hash != self.latest_block.block_hash:
            raise Exception("Previous block hash not equal to current block hash")
        
    def propose_block(self):
        block = self.create_block()

        response = requests.post(f"http://{self.node2_host}:{self.node2_port}/propose-block", json=json.loads(block.to_json()), headers={"Content-Type": "application/json"})

        response_dict = response.json()
        print(response_dict)
        if not response_dict["is_valid"]:
            print("Block not accepted by Node 2")

        print("Block Accepted by Node 2")
        print(block)
        
        self.latest_block.write_to_disk()

        with open("./latest_block.txt", "w") as file:
            file.write(self.latest_block.block_hash)

        self.latest_block = block
        self.transaction_pool.clear()
        

    def create_block(self):
        sorted_transactions = sorted(self.transaction_pool, key=lambda x: x.timestamp, reverse=True)
        new_block = Block()
        new_block.initialize(self.latest_block.block_hash, sorted_transactions)

        return new_block


    
    


    