import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "todolist_db"
});

conn.connect(err => {
    if (err) throw err;
    console.log("Connected to DB Successfully!");
});

app.get("/todos", (req, res) => {
    conn.query(`SELECT * FROM todos;`, (err, data) => {
        if (err) {
            console.log("Error Retriving in Todo List");
            throw err;
            res.status(404).json({ msg: "Error" });
        }
        else {
            console.log("Retrived all Task successfully");
            res.json(data);
        }
    });
});

app.post("/add", (req, res) => {
    let id = getUniqueId();
    let args = req.body;
    let insertQuery = `INSERT INTO todos VALUES(${id},"${args.name}","${args.desc}","false");`;
    conn.query(insertQuery, (err) => {
        if (err) {
            throw err;
            res.status(404).json({ msg: "Error while adding todo" });
        }
        else {
            console.log("Task added successfully!");
            res.json({ msg: "Added Task successfully" });
        }
    })
});

app.get("/todos/:todoId", (req, res) => {
    let id = req.params.todoId;
    let selectQuery = `SELECT * FROM todos where id=${id};`;
    conn.query(selectQuery, (err, data) => {
        if (err) {
            res.status(404).json({ msg: "Error while getting the task" });
            throw err;
        }
        else {
            console.log("Got the task sucessfully");
            res.json(data);
        }
    });
});

app.put("/todos/:todoId", (req, res) => {
    let id = req.params.todoId;
    let updateQuery = `UPDATE todos
                    SET iscomplete = "true"
                    WHERE id=${id};`;
    conn.query(updateQuery, err => {
        if (err) {
            console.log("Error Updating task");
            res.status(404).json({ msg: "Error while updating task" });
            throw err;
        }
        else {
            console.log("Updated task successfully!");
            res.json({ msg: "Updated Task successfully" });
        }
    });
});

app.delete("/todos/:todoId", (req, res) => {
    let todoId = req.params.todoId;
    let deleteQuery = `DELETE FROM todos where id = ${todoId};`;
    conn.query(deleteQuery, err => {
        if (err) {
            console.log("Error Deleting task");
            res.status(404).json({ msg: "Error while deleting task" });
            throw err;
        }
        else {
            console.log("Deleted task successfully");
            res.json({ msg: "Deleted task successfully" });
        }
    });
});

app.listen(3000, () => { console.log("Server running on Port 3000"); });

function getUniqueId() {
    return Math.floor(Math.random() * 10000);
}