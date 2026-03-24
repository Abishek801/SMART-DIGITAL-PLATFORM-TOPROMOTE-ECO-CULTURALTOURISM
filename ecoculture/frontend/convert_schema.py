import re

file_path = r'c:\Users\abish\Documents\MINI_PROJECT\ecoculture\frontend\prisma\schema.prisma'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Change provider to sqlite and url to dev.db
content = re.sub(r'provider\s*=\s*"mysql"', 'provider = "sqlite"', content)
content = re.sub(r'url\s*=\s*env\("DATABASE_URL"\)', 'url = "file:./dev.db"', content)

# Remove @db.Text and @db.VarChar
content = re.sub(r'\s*@db\.Text', '', content)
content = re.sub(r'\s*@db\.VarChar\(\d+\)', '', content)

# List of enums to convert to String
enums = [
    'Role', 'Category', 'Difficulty', 'Budget', 'ItineraryStatus', 
    'ActivityType', 'ProductCategory', 'OrderStatus', 'BookingStatus'
]

# Replace enum usage with String
for enum in enums:
    # Match MyEnum? and MyEnum in field types
    content = re.sub(rf'\s{enum}\?', ' String?', content)
    content = re.sub(rf'\s{enum}\b', ' String', content)
    # Handle defaults
    def replace_default(m):
        val = m.group(1)
        return f' @default("{val}")'
    content = re.sub(rf'\s+@default\((\w+)\)', replace_default, content)

# Remove enum blocks
for enum in enums:
    content = re.sub(rf'enum {enum}\s*\{{[^}}]*\}}', '', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Schema converted to SQLite.")
