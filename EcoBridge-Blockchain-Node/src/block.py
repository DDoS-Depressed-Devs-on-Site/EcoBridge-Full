from src.transaction import Transaction
import time
import json
import hashlib
import os

from pydantic import BaseModel

BLOCK_DIR = "./blks/"

class Block(BaseModel):
    block_hash: str = ""
    prev_block_hash: str = ""
    timestamp: int  = 0
    transactions: list[Transaction] = []

    def initialize(self, prev_block_hash, transactions: list[Transaction]):
        self.prev_block_hash = prev_block_hash
        self.timestamp = int(time.time())
        self.transactions = transactions

        self.block_hash = self.hash()

    def to_json(self):
        return json.dumps(
            {
                "block_hash": self.block_hash,
                "prev_block_hash": self.prev_block_hash,
                "timestamp": self.timestamp,
                "transactions": [json.loads(transaction.to_json()) for transaction in self.transactions] if len(self.transactions) > 0 else []
            },indent=4)
    
    def hash(self):
        block_json = self.to_json()
        block_dict = json.loads(block_json)
        del block_dict["block_hash"]
        block_json = json.dumps(block_dict, indent=4)

        return  hashlib.sha256(block_json.encode()).hexdigest()
    
    def write_to_disk(self):

        if not os.path.exists(BLOCK_DIR):
            os.makedirs(BLOCK_DIR)
        
        with open(f"{BLOCK_DIR}{self.block_hash}", "w") as file:
            print("Writing to file")
            file.write(self.to_json())



