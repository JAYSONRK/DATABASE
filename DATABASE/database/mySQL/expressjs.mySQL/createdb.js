const express = require('express');
const db = require('./connection.js');

const app = express();

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
  db.query('CREATE DATABASE IF NOT EXISTS mydb', function(err, result) {
    if (err) throw err;
    console.log('Database created or already exists');
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
