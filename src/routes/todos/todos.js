const express = require("express");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const todos = express.Router();

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

todos.post("/", authenticateToken, (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.status || !req.body.user_id)
        return res.status(400).send({msg: "Bad parameter"});

    if (typeof req.body.title !== "string" || typeof req.body.description !== "string" || typeof req.body.status !== "string")
        return res.status(400).json({msg: "Bad parameter"});

    const todo = {
        title: req.body.title,
        description: req.body.description,
        due_time: req.body.due_time,
        user_id: req.body.user_id,
        status: req.body.status
    };

    db.query('INSERT INTO todo SET ?', todo, (err, result) => {
        if (err) {
            res.status(500).json({msg: "Internal Server Error"});
        } else {
            todo.id = result.insertId;
            res.status(200).send({todo: todo});
        }
    });
});

module.exports = { todos };
