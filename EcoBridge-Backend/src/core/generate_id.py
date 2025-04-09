from src.database.database import create_connection
from src.database.table_models import Inventory, Request, Organization, User
import string
import secrets
import traceback
from ecdsa import SigningKey, SECP256k1


def create_key_pair():
    # User side: Generate private + public key
    private_key = SigningKey.generate(curve=SECP256k1)
    public_key = private_key.get_verifying_key()

    priv_hex = private_key.to_string().hex()
    pub_hex = public_key.to_string().hex()

    return (priv_hex, pub_hex)

def generate_key_pair():
    session = create_connection()
    characters = string.ascii_letters + string.digits
    try:
        while True:
            [priv_key, pub_key] = create_key_pair()
            res = session.query(Organization).filter(Organization.pub_key == pub_key).first()
            res1 = session.query(User).filter(User.pub_key == pub_key).first()
            if not res and not res1:
                return (priv_key, pub_key) 
    except Exception as e:
        print(traceback.format_exc())
        return -1
    finally:
        session.close()

def generate_inventory_id():
    session = create_connection()
    characters = string.ascii_letters + string.digits
    try:
        while True:
            random_id = "".join(secrets.choice(characters) for _ in range(10))
            res = session.query(Inventory).filter(Inventory.inventory_id == random_id).first()
            if not res:
                return random_id
    except Exception as e:
        print(traceback.format_exc())
        return -1
    finally:
        session.close()
    
def generate_request_id():
    session = create_connection()
    characters = string.ascii_letters + string.digits
    try:
        while True:
            random_id = "".join(secrets.choice(characters) for _ in range(10))
            res = session.query(Request).filter(Request.request_id == random_id).first()
            if not res:
                return random_id
    except Exception as e:
        print(traceback.format_exc())
        return -1
    finally:
        session.close()
    