from ecdsa import SigningKey, SECP256k1

# User side: Generate private + public key
private_key = SigningKey.generate(curve=SECP256k1)
public_key = private_key.get_verifying_key()

# Save/export keys
priv_hex = private_key.to_string().hex()
pub_hex = public_key.to_string().hex()

print("Private Key:", priv_hex)
print("Public Key:", pub_hex)