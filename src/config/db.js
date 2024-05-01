const mysql = require('mysql2');

require("dotenv").config();

const database = mysql.createConnection({
    host : "127.0.0.1",
    user : "elias",
    password : "elias",
    database : "epytodo"
});
database.connect((err) => {
    if (err) throw err;
    console.log('successfully connected !');
});
module.exports = database;
