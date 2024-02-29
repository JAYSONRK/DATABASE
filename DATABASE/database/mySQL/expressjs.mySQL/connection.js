const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "college",
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("MySQL database connected!");
// });

module.exports = con;
