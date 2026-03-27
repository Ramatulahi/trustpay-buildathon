import hashlib
import json

def verify_chain(log_file_path):
    print(f"🧐 Auditing {log_file_path}...")
    prev_hash = "0"
    line_count = 0
    
    with open(log_file_path, "r") as f:
        for line in f:
            line_count += 1
            # Split the JSON data from the saved hash
            parts = line.split(" | HASH: ")
            data_json = json.loads(parts[0])
            saved_hash = parts[1].strip()
            
            # Re-calculate what the hash SHOULD be
            raw_data = json.dumps(data_json, sort_keys=True).encode()
            calculated_hash = hashlib.sha256(raw_data).hexdigest()
            
            # 1. Check if the current data matches its hash
            if calculated_hash != saved_hash:
                print(f"❌ TAMPERING DETECTED at Line {line_count}!")
                return False
                
            # 2. Check if this entry correctly points back to the previous one
            if data_json["prev_hash"] != prev_hash:
                print(f"❌ CHAIN BROKEN at Line {line_count}! Previous hash mismatch.")
                return False
                
            prev_hash = saved_hash
            
    print(f"✅ Audit Complete. All {line_count} entries are authentic and untampered.")
    return True

if __name__ == "__main__":
    verify_chain("cyber/audit_trail.log")