const express = require('express');
const app = express();
const port = 3000;

// Middleware - JSON data parse karne ke liye
app.use(express.json());

//Database (temporary - memory mein store)
let students = [
    {
        id: 1,
        name: "Ahmad Ali",
        rollNumber: "2024-CS-01",
        date: "2026-06-17",
        status: "present"
    },
    {
        id: 2,
        name: "Fatima Khan",
        rollNumber: "2024-CS-02",
        date: "2026-06-17",
        status: "absent"
    }
];
let currentId = 3;

// GET / - Welcome message

app.get('/', (req, res) => {
    res.status(200).json({
        message: "🎓 Student Attendance API is running!",
        endpoints: {
            GET: "/attendance - View all attendance",
            POST: "/attendance - Mark attendance",
            GET: "/attendance/:id - View single student"
        }
    });
});

// GET /attendance - Saari attendance dikhao

app.get('/attendance', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

// GET /attendance/:id - Ek student ki attendance

app.get('/attendance/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const student = students.find(s => s.id === id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student with ID ${id} not found`
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

// POST /attendance - Naya attendance mark karein

app.post('/attendance', (req, res) => {
    try {
        const { name, rollNumber, date, status } = req.body;

        // VALIDATION - "Never Trust the Client"
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Student name is required"
            });
        }

        if (!rollNumber) {
            return res.status(400).json({
                success: false,
                message: "Roll number is required"
            });
        }

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date is required (YYYY-MM-DD)"
            });
        }

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required (present/absent)"
            });
        }

        // Status validation (sirf present ya absent)
        if (status !== 'present' && status !== 'absent') {
            return res.status(400).json({
                success: false,
                message: "Status must be either 'present' or 'absent'"
            });
        }

        // Date format validation (basic)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({
                success: false,
                message: "Date must be in YYYY-MM-DD format"
            });
        }

        // SAB VALIDATION PASS - Ab data save karo
        const newStudent = {
            id: currentId++,
            name: name.trim(),
            rollNumber: rollNumber.trim(),
            date: date,
            status: status
        };

        students.push(newStudent);

        // SUCCESS RESPONSE - 201 Created
        res.status(201).json({
            success: true,
            message: "Attendance marked successfully!",
            data: newStudent
        });

    } catch (error) {
        // SERVER ERROR - 500
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});

//DELETE /attendance/:id - Student delete karein (Extra)

app.delete('/attendance/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = students.findIndex(s => s.id === id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Student with ID ${id} not found`
            });
        }

        students.splice(index, 1);
        res.status(200).json({
            success: true,
            message: `Student with ID ${id} deleted successfully`
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

// Server Start
app.listen(port, () => {
    console.log(`Attendance API is running at http://localhost:${port}`);
    console.log(`GET  → http://localhost:${port}/attendance`);
    console.log(`POST → http://localhost:${port}/attendance`);
});