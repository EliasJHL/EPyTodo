CREATE DATABASE IF NOT EXISTS epytodo;

CREATE TABLE user
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    created_at DATETIME
);

CREATE TABLE todo
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME,
    due_time DATETIME NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL,
    user_id INT NOT NULL
);
