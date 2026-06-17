# Student Attendance API

A RESTful API for managing student attendance built with Node.js and Express.js.


## Features

- GET `/attendance` - Get all attendance records
- GET `/attendance/:id` - Get single student
- POST `/attendance` - Mark attendance with validation
- DELETE `/attendance/:id` - Delete student
- Input validation (name, roll number, date, status)
- Proper HTTP status codes (200, 201, 400, 404, 500)

---

## Tech Stack

- **Node.js**
- **Express.js**
- **JavaScript**
- **Postman** (for testing)

---

## Project Structure
fullstack-project2/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

---

## Installation

# Clone repository
git clone https://github.com/lybah-gif/Decodeslab-project-2.git

# Go to project folder
cd Decodeslab-project-2/fullstack-project2

# Install dependencies
npm install

# Start server
node server.js
Server will run at: http://localhost:3000

# API Endpoints
Method	Endpoint	Description
GET	/	Welcome message
GET	/attendance	Get all students
GET	/attendance/:id	Get single student
POST	/attendance	Mark attendance
DELETE	/attendance/:id	Delete student
# Examples
GET All Students
http
GET http://localhost:3000/attendance
POST Mark Attendance
http
POST http://localhost:3000/attendance
Content-Type: application/json

{
    "name": "Usman Raza",
    "rollNumber": "2024-CS-03",
    "date": "2026-06-17",
    "status": "present"
}
# DELETE Student
http
DELETE http://localhost:3000/attendance/3
# Validation Rules
Field	Rule
name	Required
rollNumber	Required
date	Required (YYYY-MM-DD)
status	Required (present/absent)
# HTTP Status Codes
Code	Meaning
200	OK
201	Created
400	Bad Request
404	Not Found
500	Internal Error
# Testing
Tested with Postman. Screenshots available in Screenshots/ folder.

# Author
Laiba Zahid
Batch 2026 | DecodeLabs Industrial Training Program

📅 Date
June 17, 2026
