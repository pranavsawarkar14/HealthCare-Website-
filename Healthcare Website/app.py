from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///appointments.db'
db = SQLAlchemy(app)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)  # New line
    date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contactus.html')

@app.route('/learn')
def learn_more():
    return render_template('learn_more.html')

@app.route('/appointment')
def appointment():
    return render_template('appointment.html')



# Ensure the appointments file is in the same directory as this script
CORS(app, resources={r"/book_appointment": {"origins": "http://localhost:5500"}})
APPOINTMENTS_FILE = os.path.join(os.path.dirname(__file__), 'appointments.txt')

@app.route('/book_appointment', methods=['POST'])
def book_appointment():
    data = request.json
    required_fields = ['firstName', 'lastName', 'address', 'phone']
    
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    
    # Process the appointment booking here
    
    return jsonify({"message": "Appointment booked successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)