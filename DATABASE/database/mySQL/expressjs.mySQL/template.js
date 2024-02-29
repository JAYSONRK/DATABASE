const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./connection.js'); // Assuming you have a separate file for database connection

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/students', (req, res) => {
    const sql = "SELECT * FROM students";

    con.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching students:", err);
            return res.status(500).send("Database error");
        }
        
        // Log the results obtained from the database
        console.log("Database results:", results);

        // Render the 'students' EJS file with the fetched data
        res.render('students', { students: results });
    });
});

// Delete request
app.get('/delete-student', (req, res) => {
    const id = req.query.id;
    const sql = "DELETE FROM students WHERE id=?";

    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).send("Database error");
        }
        
        console.log("Student deleted successfully");
        res.redirect('/students');
    });
});

// Route for updating a student (GET method to retrieve student data and display form)
app.get('/update-student', (req, res) => {
    const id = req.query.id;
    const sql = "SELECT * FROM students WHERE id=?";

    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching student data:", err);
            return res.status(500).send("Database error");
        }
        
        res.render('update-student-form', { student: results[0] });
    });
});

// Route for handling update form submission (POST method)
app.post('/update-student', (req, res) => {
    const id = req.query.id;
    const { name, email, mobile } = req.body;
    const sql = "UPDATE students SET Name=?, Email=?, Mobile=? WHERE id=?";

    con.query(sql, [name, email, mobile, id], (err, results) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).send("Database error");
        }
        
        console.log("Student updated successfully");
        res.redirect('/students');
    });
});



// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
