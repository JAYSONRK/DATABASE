const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./connection.js'); // Assuming you have a separate file for database connection

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for rendering the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register/register.html');
});

// Route for handling registration form submission
app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mno;

    // Connect to the database
    con.connect((err) => {
        if(err) throw err;

        // Select the database
        con.query("USE college", (err, result) => {
            if (err) throw err;
            console.log("Database selected");

            // Insert data into the students table
            const sql = "INSERT INTO students (Name, Email, Mobile) VALUES (?, ?, ?)";
            const values = [name, email, mobile];

            con.query(sql, values, (err, result) => {
                if (err) throw err;
                console.log("1 record inserted");
                res.send("Data inserted successfully");
            });
        });
    });
});

// Route for fetching and rendering all students
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

// Route for deleting a student
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

// Route for updating a student (GET method to retrieve student data)
app.get('/update-students', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE id=?";

    con.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching student data:", err);
            return res.status(500).send("Database error");
        }
        
        res.render(__dirname+'update-student', { student: results[0] });
    });
});

// Route for updating a student (POST method to update student data)
app.post('/update-student/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, mobile } = req.body;
    const sql = "UPDATE students SET Name=?, Email=?, Mobile=? WHERE id=?";

    con.query(sql, [name, email, mobile, id], (err, results) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).send("Database error");
        }
        
        console.log("Student updated successfully");
        res.redirect('/student');
    });
});


// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
