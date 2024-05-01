const express = require("express");
const register = express.Router();
const crypt = require("bcryptjs");
const db = require("../config/db");
const e = require("express");

register.post("/register", (req, res) => {

    if (!req.body.email || !req.body.password || !req.body.name || !req.body.firstname)
        return res.status(400).send({msg: "Bad parameter"});

    if (typeof req.body.email !== "string" || typeof req.body.password !== "string" || 
        typeof req.body.name !== "string" || typeof req.body.firstname !== "string")
        return res.status(400).json({msg: "Bad parameter"});

    const hash = crypt.hash(req.body.password, 10);

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
            res.status(200).send({token: user.id});
        }
    });
});

module.exports = register;
