/*
** A Project of the Epitech
** A ToDo App Backend
** A REST API for a ToDo App
** Created on April 2024 by Elias J. HAJJAR & Branhim BENALI 
*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypt = require("bcryptjs");
const db = require("./config/db");

const app = express();
const port = 5000;

app.use(bodyParser.json());
require('dotenv').config();


const { register, login } = require('./routes/auth/auth.js');
const { user, user_id } = require('./routes/user/user.js');
const { todos, todos_id } = require('./routes/todos/todos.js');

app.use('/register', register);
app.use('/login', login);
app.use('/user', user);
app.use('/user/:IDOrEmail', user_id);
app.use('/todos', todos);
app.use('/todos/:id', todos_id);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
