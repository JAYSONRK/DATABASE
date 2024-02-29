const express = require('express');
const app = express();
const db = require('./connection.js'); // import the database connection module

// Your Express routes and other middleware configurations

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
