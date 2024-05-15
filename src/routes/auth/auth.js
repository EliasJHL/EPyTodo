const express = require("express");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const register = express.Router();
const login = express.Router();

register.post("/", (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstname)
        return res.status(400).send({msg: "Bad parameter"});

    if (typeof req.body.email !== "string" || typeof req.body.password !== "string" ||
        typeof req.body.name !== "string" || typeof req.body.firstname !== "string")
        return res.status(400).json({msg: "Bad parameter"});

    db.query('SELECT * FROM user WHERE email = ?', req.body.email, (err, result) => {
        if (result.length > 0) {
            return res.status(500).json({msg: "Account already exists"});
        }
        const hash = crypt.hashSync(req.body.password, 2);

        const user = {
            email: req.body.email,
            password: hash,
            name: req.body.name,
            firstname: req.body.firstname,
            created_at: new Date()
        };

        db.query('INSERT INTO user SET ?', user, (err, result) => {
            if (err) {
                res.status(500).json({msg: "Account already exists"});
            } else {
                res.status(200).send({token: result.insertId});
            }
        });
    });
});

login.post("/", (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).send({msg: "Invalid Credentials"});

    if (typeof req.body.email != "string" || typeof req.body.password != "string")
        return res.status(400).send({msg: "Invalid Credentials"});

    db.query('SELECT * FROM user WHERE email = ?', req.body.email, (err, result) => {
        if (result.length <= 0)
            return res.status(500).json({msg: "Invalid Credentials"});

        crypt.compare(req.body.password, result[0].password, (err, result) => {
            if (result) {
                const token = jwt.sign({id: req.body.id, email: req.body.email}, process.env.SECRET, {expiresIn: "1h"});
                res.status(200).send({token: token});
            } else {
                res.status(500).send({msg: "Invalid Credentials"});
            }
        });
    });
});

module.exports = { register, login };