const express = require("express");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const user = express.Router();
const user_id = express.Router({mergeParams: true});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({msg: "No token, authorization denied"});

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

user.get("/", authenticateToken, (req, res) => {
    const id = user.id;

    if (!id) return res.status(500).json({msg: "Internal Server Error"});
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "Internal Server Error"});
        }
        if (result.length <= 0) return res.status(404).json({msg: "Not Found"})
        return res.status(200).json({
            id: result[0].id, 
            email: result[0].email, 
            password: result[0].password, 
            created_at: result[0].created_at.toISOString().slice(0, 19).replace('T', ' '),
            firstname: result[0].firstname, 
            name: result[0].name
        });
    });
});

user_id.get("/", authenticateToken, (req, res) => {
    const input = req.params.IDOrEmail;
    var id = 0;
    var email = "";

    if (isNaN(input)) {
        email = input;
    } else {
        id = input;
    }

    if (email && id) return res.status(400).json({msg: "Bad parameter"});
    if (!email) {
        db.query('SELECT * FROM user WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({msg: "Internal Server Error"});
            }
            if (result.length <= 0) return res.status(404).json({msg: "Not Found"})
            return res.status(200).json({
                id: result[0].id, 
                email: result[0].email, 
                password: result[0].password, 
                created_at: result[0].created_at.toISOString().slice(0, 19).replace('T', ' '),
                firstname: result[0].firstname, 
                name: result[0].name
            });
        });
    } else if (!id) {
        db.query('SELECT * FROM user WHERE email = ?', [email], (err, result) => {
            if (err) {
                return res.status(500).json({msg: "Internal Server Error"});
            }
            if (result.length <= 0) return res.status(404).json({msg: "Not Found"})
            return res.status(200).json({
                id: result[0].id, 
                email: result[0].email, 
                password: result[0].password, 
                created_at: result[0].created_at.toISOString().slice(0, 19).replace('T', ' '),
                firstname: result[0].firstname, 
                name: result[0].name
            });
        });
    } else if (!id && !email) {
        return res.status(400).json({msg: "Bad parameter"});
    }
});


module.exports = { user, user_id };