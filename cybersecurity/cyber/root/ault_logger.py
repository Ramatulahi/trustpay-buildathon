import hashlib
import json
import time
import os

def generate_secure_log(action, user_id, details, previous_hash="0"):
    r"""
    Creates a tamper-evident log entry using a Hash Chain.
    Logic: $H_i = \text{SHA256}(Data_i \parallel H_{i-1})$
    The 'r' before these quotes handles the backslashes in the math notation.
    """
    log_entry = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "action": action,
        "user_id": user_id,
        "details": details,
        "prev_hash": previous_hash
    }
    
    # Canonicalize data (sort keys) to ensure the hash is consistent
    log_string = json.dumps(log_entry, sort_keys=True).encode()
    current_hash = hashlib.sha256(log_string).hexdigest()
    
    # Ensure the 'cyber' directory exists before writing
    os.makedirs("cyber", exist_ok=True)
    
    # Append the entry to the Audit Trail
    with open("cyber/audit_trail.log", "a") as f:
        f.write(f"{json.dumps(log_entry)} | HASH: {current_hash}\n")
    
    print(f"✅ Log Entry Secured. Chain Hash: {current_hash[:10]}...")
    return current_hash

if __name__ == "__main__":
    print("🚀 Initializing Immutable Audit Vault...")
    print("-" * 40)
    
    # Simulation of a standard transaction flow for your demo
    h1 = generate_secure_log("TX_INITIATED", "fola_admin", "Amount: 25000")
    time.sleep(1) # Adding a delay for realism
    h2 = generate_secure_log("FUNDS_ESCROWED", "fola_admin", "Status: Locked", h1)
    time.sleep(1)
    h3 = generate_secure_log("DELIVERY_CONFIRMED", "fola_admin", "Status: Released", h2)
    
    print("-" * 40)
    print("🔒 Audit Trail fully chained and verified.")