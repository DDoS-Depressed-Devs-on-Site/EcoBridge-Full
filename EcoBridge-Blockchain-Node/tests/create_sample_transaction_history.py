import time
import requests
import json
import sys
import os
import random

# Adds the parent directory of the current file to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.transaction import Transaction
from ecdsa import SigningKey, SECP256k1


def create_key_pair():
    # User side: Generate private + public key
    private_key = SigningKey.generate(curve=SECP256k1)
    public_key = private_key.get_verifying_key()

    # Save/export keys
    priv_hex = private_key.to_string().hex()
    pub_hex = public_key.to_string().hex()

    return (priv_hex, pub_hex)

def generate_random_items():
    sample_items = ["Ration", "Clothes", "Medicine", "Water", "Tools"]
    return [
        {"name": random.choice(sample_items), "category": "test", "qty": str(random.randint(1, 50))}
        for _ in range(random.randint(1, 4))
    ]

def simulate_transaction_lifespan():
    # [sender_prv, sender_pub] = create_key_pair()
    sender_prv = "64dcf4072721356fe679365bac11a1549b0a3adcc6afa80d436f439d7a8951c4"
    sender_pub = "09b928dea2cbdbc92feca0eed6efe355cf3c716ab4fb96b93a7bc688c002d566f9095ec244ab26fc556e44be862ea808f654d8d9ca2bc6b45eed7291b697604c"

    [hub1_prv, hub1_pub] = create_key_pair()

    [hub2_prv, hub2_pub] = create_key_pair()

    [hub3_prv, hub3_pub] = create_key_pair()

    [reciever_prv, reciever_pub] = create_key_pair()

    transaction_json = {
        "transaction_hash": "",
        "sender_pub_key": sender_pub,
        "reciever_pub_key": reciever_pub,
        "tracking_no": "0",
        "timestamp": int(time.time()),
        "extimated_time_delivered": int(time.time()), 

        "curr_state": {
            "hub_id": "0",
            "status": "Pending",
            "handler": ""
        },

        "items": generate_random_items(),

        "prev_block_hash": "0",
        "prev_transaction_hash": "0",
        "signature": ""
    }


    transaction = Transaction(**transaction_json)
    transaction.sign(sender_prv)
    transaction.validate()

    API_URL ="http://127.0.0.1:8080/" 

    print("Creating initial request: ", f"{API_URL}transaction/create")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    response = response.json()

    transaction.tracking_no = response["tracking_no"]
    transaction.prev_transaction_hash = response["hash"]
    transaction.timestamp = int(time.time())
    transaction.curr_state.status = "Confirmed"
    transaction.sign(sender_prv)
    transaction.validate()

    transaction.to_json()

    if transaction.tracking_no == "0":
        print("Transaction number is 0 \n\n\n\n")

    print("Creating initial request")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    response = response.json()

    transaction.prev_transaction_hash = response["hash"]
    transaction.sender_pub_key = hub1_pub

    transaction.curr_state.hub_id = "HUB001"
    transaction.curr_state.status = "In Transit"
    transaction.curr_state.handler = "John Doe"
    transaction.sign(hub1_prv)
    transaction.validate()


    print("transit to hub1")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    response = response.json()

    transaction.prev_transaction_hash = response["hash"]
    transaction.sender_pub_key = hub2_pub

    transaction.curr_state.hub_id = "HUB002"
    transaction.curr_state.status = "In Transit"
    transaction.curr_state.handler = "John Smith"
    transaction.sign(hub2_prv)
    transaction.validate()

    print("transit to hub2")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    response = response.json()

    transaction.prev_transaction_hash = response["hash"]
    transaction.sender_pub_key = hub3_pub

    transaction.curr_state.hub_id = "HUB003"
    transaction.curr_state.status = "In Transit"
    transaction.curr_state.handler = "Mishaye Cotton"
    transaction.sign(hub3_prv)
    transaction.validate()

    print("transit to hub3")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    response = response.json()
    transaction.prev_transaction_hash = response["hash"]
    transaction.sender_pub_key = reciever_pub

    transaction.curr_state.hub_id = "0"
    transaction.curr_state.status = "Recieved"
    transaction.curr_state.handler = ""
    transaction.sign(reciever_prv)
    transaction.validate()

    print("Recieved by reciever")
    response = requests.post(f"{API_URL}transaction/create", json=json.loads(transaction.to_json()), headers={"Content-Type": "application/json", "Connection": "close"})
    time.sleep(random.randint(1, 4))

    print("This transaction was made by: ", sender_pub)
    print("Was recieved by: ", reciever_pub)
    print("To track transaction use this tracking number: ", transaction.tracking_no)

# import threading
# if __name__ == "__main__":
#     threads = []
#     for i in range(5):
#         t = threading.Thread(target=simulate_transaction_lifespan)
#         t.start()
#         threads.append(t)

#     for t in threads:
#         t.join()
#     simulate_transaction_lifespan()

data = {
    "curr_state": {
        "handler": "Juan Dela Cruz",
        "hub_id": "HUB123",
        "status": "In Transit",
    },
    "estemated_time_delivered": 1712572800,
    "items": [
        {
            "category": "Electronics",
            "name": "Smartphone",
            "qty": "2",
        },
        {
            "category": "Accessories",
            "name": "Charger",
            "qty": "1",
        },
    ],
    "prev_transaction_hash": "0000abc123",
    "reciever_pub_key": "4dca249f3192ce9bf8ccc36b55c7516dc284013e26b353c7558857397c134bdb96e8ec1513ed0e6839f09e391b6ae81c26d4b62d4593d921ece4bbe23f5e6ea4",
    "sender_pub_key": "4dca249f3192ce9bf8ccc36b55c7516dc284013e26b353c7558857397c134bdb96e8ec1513ed0e6839f09e391b6ae81c26d4b62d4593d921ece4bbe23f5e6ea4",
    "signature": "deadbeefcafedeadbeefcafedeadbeefcafedeadbeefcafedeadbeefcafedeadbeefcafe",
    "timestamp": 1712569200,
    "tracking_no": "TRACK123456",
    "transaction_hash": "abcd1234hashvalue",
    "urgency": "Urgent",
}


t = Transaction(**data)
print(t.to_json())
print(t.hash())
t.sign("c3e0382e390c8ae0206df4f53f4da49d296985573c4e93fb62040359c94cfd2d")

t.validate()
