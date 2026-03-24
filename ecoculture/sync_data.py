import json
import re
import os

def parse_ts(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the array content
    # Look for destinations = [ ... ] or products = [ ... ]
    match = re.search(r'(?:destinations|products)\s*=\s*\[(.*)\];', content, re.DOTALL)
    if not match:
        print(f"Could not find array in {file_path}")
        return []
    
    array_str = match.group(1)
    
    # Very basic parser for the specific format
    items = []
    # Identify objects by { ... }
    # Using a more robust regex for nested objects if any, though the source seems simple
    obj_matches = re.finditer(r'\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}', array_str)
    
    for obj_match in obj_matches:
        obj_text = obj_match.group(1)
        item = {}
        
        # Simple key-value extraction
        lines = obj_text.split('\n')
        for line in lines:
            line = line.strip()
            if not line or ':' not in line: continue
            
            # Split only on the first colon
            key, val_str = line.split(':', 1)
            key = key.strip()
            val_str = val_str.strip().rstrip(',')
            
            # Handle types
            if val_str.startswith('"') or val_str.startswith("'"):
                # Handle escaped quotes
                val = val_str[1:-1].replace("\\'", "'").replace('\\"', '"')
            elif val_str.lower() == 'true':
                val = True
            elif val_str.lower() == 'false':
                val = False
            elif val_str.startswith('['):
                # Handle arrays of strings or numbers
                try:
                    # Replace single quotes with double quotes for json compatibility
                    # This is risky but works for the current data format
                    clean_arr = val_str.replace("'", '"')
                    val = json.loads(clean_arr)
                except:
                    val = val_str
            else:
                try:
                    if '.' in val_str:
                        val = float(val_str)
                    else:
                        val = int(val_str)
                except ValueError:
                    val = val_str
            
            item[key] = val
        items.append(item)
    return items

def save_json_split(items, base_path):
    mid = len(items) // 2
    part1 = items[:mid]
    part2 = items[mid:]
    
    # Special handling for Java/JPA expectation of JSON strings for certain fields
    def prepare_for_java(item):
        new_item = item.copy()
        for key in ['highlights', 'galleryUrls', 'certifications']:
            if key in new_item and isinstance(new_item[key], list):
                new_item[key] = json.dumps(new_item[key])
        return new_item

    with open(f"{base_path}_1.json", 'w', encoding='utf-8') as f:
        json.dump([prepare_for_java(i) for i in part1], f, indent=2)
    with open(f"{base_path}_2.json", 'w', encoding='utf-8') as f:
        json.dump([prepare_for_java(i) for i in part2], f, indent=2)

# Paths
base_dir = r"c:\Users\abish\Documents\MINI_PROJECT\ecoculture"
frontend_data = os.path.join(base_dir, "frontend", "prisma", "data")
backend_data = os.path.join(base_dir, "backend", "src", "main", "resources", "data")

# Run conversion
dests = parse_ts(os.path.join(frontend_data, "destinations.ts"))
prods = parse_ts(os.path.join(frontend_data, "products.ts"))

if dests:
    save_json_split(dests, os.path.join(backend_data, "destinations"))
if prods:
    save_json_split(prods, os.path.join(backend_data, "products"))

print(f"Successfully converted {len(dests)} destinations and {len(prods)} products.")
