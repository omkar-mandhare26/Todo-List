import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getUniqueId() {
    return Math.floor(Math.random() * 10000);
}

let todos = [{
    id: 4148,
    name: "Code",
    description: "Code for an hour",
    isCompleted: false
}];

app.post("/add", (req, res) => {
    let id = getUniqueId();
    let args = req.body;
    const todo = { id, name: args.name, description: args.desc, isCompleted: false };
    console.log(args);
    res.json(todo);
});


app.get("/todos", (req, res) => {
    res.json(todos);
});

app.get("/todos/:todoId", (req, res) => {
    let id = req.params.todoId;
    let todo;
    todos.forEach((e) => {
        if (e.id == id) todo = e;
    });
    if (todo) res.json(todo);
    else res.status(404).json({ msg: "Not Found" });
});

app.put("/todos/:todoId", (req, res) => {
    let id = req.params.todoId;
    let isComplete = req.query.isComplete;
    todos.forEach((e) => {
        if (e.id == id) e.isCompleted = isComplete;
    });
    res.json(todos);
});

app.delete("/todos/:todoId", (req, res) => {
    let todoId = req.params.todoId;
    if (todos.length = 0) res.status(404).json({ msg: "Todo is Empty" });
    else {
        todos.filter(e => e.id == todoId);
    }
    res.json(todos);
});

app.listen(3000, () => { console.log("Server running on 3000"); });