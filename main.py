from flask import Flask, render_template, request, redirect, url_for
import sqlite3


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact2', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Get the form data
        username = request.form['Username']
        password = request.form['Password']
        email = request.form['Email']

        # TODO: Save the form data to a database or send it via email
        # Check if the username exists in the table
        # Connect to the database
        conn = sqlite3.connect('example.db')

        # Create a cursor object
        c = conn.cursor()
        result = c.fetchall()
        if result:
            print(f"{username} exists in the database.")
        else:
            # Insert the username into the table
            
            c.execute("INSERT INTO contacts (username, password, email) VALUES (?, ?, ?)", (username, password, email))
            print(f"{username} has been added to the database.")

        # Commit the changes
        conn.commit()
        conn.close()

        # Redirect to the thank you page
        return redirect(url_for('thank_you'))

    return render_template('contact2.html')

@app.route('/thank-you')
def thank_you():
    return render_template('thank_you.html')
@app.route('/contact')
def maincontact():
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)