/*
** A Project of the Epitech
** A ToDo App Backend
** A REST API for a ToDo App
** Created on April 2024 by Elias J. HAJJAR & Branhim BENALI 
*/

const express = require("express");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const todos = express.Router();
const todos_id = express.Router({mergeParams: true});

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

todos_id.get("/", authenticateToken, (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({msg: "Bad parameter"});
    db.query('SELECT * FROM todo WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({msg: "Internal Server Error"});
        }
        if (result.length <= 0) return res.status(404).json({msg: "Not Found"})
        return res.status(200).json({
            id: result[0].id,
            title: result[0].title,
            description: result[0].description,
            due_time: result[0].due_time,
            user_id: result[0].user_id,
            status: result[0].status
        });
    });
});

module.exports = { todos, todos_id };
