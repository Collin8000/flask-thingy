import sqlite3

# Connect to the database
conn = sqlite3.connect('example.db')

# Create a cursor object
c = conn.cursor()

# Search for a username in the table
username = "mango"
password = "1234"
email = "app@app.com"
c.execute("CREATE TABLE IF NOT EXISTS contacts (username TEXT, password TEXT, email TEXT)")
c.execute("SELECT * FROM contacts WHERE username=?", (username,))
result = c.fetchone()

# Check if the username exists in the table
if result:
    print(f"{username} exists in the database.")
else:
    # Insert the username into the table
    
    c.execute("INSERT INTO contacts (username, password, email) VALUES (?, ?, ?)", (username, password, email))
    print(f"{username} has been added to the database.")

# Commit the changes
conn.commit()

# Close the connection
conn.close()