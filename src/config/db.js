const e = require('express');
const mysql = require('mysql2');

require("dotenv").config();

const env = process.env;

const database = mysql.createConnection({
    host : env.MYSQL_HOST,
    user : env.MYSQL_USER,
    password : env.MYSQL_ROOT_PASSWORD,
    database : env.MYSQL_DATABASE
});
database.connect((err) => {
    if (err) throw err;
    console.log('successfully connected !');
});
module.exports = database;
