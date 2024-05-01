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
const jsontoken = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
const port = 3000;

require('dotenv').config();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
