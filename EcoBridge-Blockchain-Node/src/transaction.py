import time
from src.locations import does_hub_exist
# from src.blockchain import Blockchain
from ecdsa import VerifyingKey, SigningKey,SECP256k1
import json
import hashlib
import secrets
import string

from pydantic import BaseModel

TRANSATION_TIME_VALID = 3600 # 1 hour of time till a transaction is not valid upon validation of transaction

transaction_no = set()


used_tracking_numbers = set()
def generate_unique_tracking_number():
    chars = string.ascii_uppercase + string.digits
    while True:
        tracking_no = ''.join(secrets.choice(chars) for _ in range(10))
        if tracking_no not in used_tracking_numbers:
            used_tracking_numbers.add(tracking_no)
            return tracking_no


class Item(BaseModel):
    category: str
    name: str
    qty: str

class State(BaseModel):
    hub_id: str
    status: str
    handler: str

class Transaction(BaseModel):
    transaction_hash: str
    sender_pub_key: str
    reciever_pub_key: str
    tracking_no: str
    timestamp: int 
    estemated_time_delivered: int 
    urgency: str

    curr_state: State
    items: list[Item]

    prev_transaction_hash: str
    signature: str

    def validate(self):
        print("Validating transaction")

        if len(self.sender_pub_key) != 128:
            raise Exception("Sender public key not valid")
        print("1. Sender pub key valid")
        if len(self.reciever_pub_key) != 128:
            raise Exception("Reciever public key not valid")
        print("2. Reciever pub key valid")
        # if time.time() - self.timestamp > TRANSATION_TIME_VALID:
        #     raise Exception("Transaction request timeout") 
        print("3. Timestamp within time limit range")
        if does_hub_exist(self.curr_state.hub_id):
            raise Exception("Invalid State: Location Id not valid")
        print("4. Hub valid")
        if len(self.items) <= 0:
            raise Exception("Invalid items: Must be atleast one item")
        print("5. Items valid")
        if False: #TODO: Change this to actual logic
            raise Exception("Invalid block: Previous block not the latest block please try again")
        print("5. Previous block hash valid")
        if not self.verify_signature():
            raise Exception("Invalid signature: Signature does not match data given")
        print("6. signature valid")

    def to_json(self):
        return json.dumps({
        "transaction_hash": self.transaction_hash,
        "sender_pub_key": self.sender_pub_key,
        "reciever_pub_key": self.reciever_pub_key,
        "tracking_no": self.tracking_no,
        "timestamp": self.timestamp,
        "estemated_time_delivered": int(time.time()),
        "urgency": "Urgent",

        "curr_state": {
            "hub_id": self.curr_state.hub_id,
            "status": self.curr_state.status,
            "handler": self.curr_state.handler
        },
        "items": [
            {"category": item.category,"name": item.name, "qty": item.qty} for item in self.items
        ],
        "prev_transaction_hash": self.prev_transaction_hash,
        "signature": self.signature
        }, separators=(',', ':'), sort_keys=True)
        
    def hash(self):
        transaction_json = self.to_json()
        transaction_dict = json.loads(transaction_json)
        del transaction_dict["signature"] # we remove signature because we only want the original data for hashing
        del transaction_dict["tracking_no"] # we also remove tracking number because this is generated after validating
        del transaction_dict["transaction_hash"]
        transaction_json = json.dumps(transaction_dict, separators=(',', ':'), sort_keys=True)
        print("before hash", transaction_json)
        self.transaction_hash = hashlib.sha256(transaction_json.encode()).hexdigest() 
        return self.transaction_hash

    def verify_signature(self):
        sender_public_key = VerifyingKey.from_string(bytes.fromhex(self.sender_pub_key), curve=SECP256k1)
        transaction_hash = self.hash()
        signature_bytes = bytes.fromhex(self.signature)

        try:
            sender_public_key.verify(signature_bytes, transaction_hash.encode())
            return True
        except Exception as e:
            return False
        
    def sign(self, private_key_hex):
        sk = SigningKey.from_string(bytes.fromhex(private_key_hex), curve=SECP256k1)
        transaction_hash = self.hash()
        signature = sk.sign(transaction_hash.encode())
        self.signature = signature.hex()