const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    await todo.save();
    res.json(todo);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    res.json(todo);
  }
  catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;