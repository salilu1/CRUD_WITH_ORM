const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const db = require("../models");
const Todo = db.Todo;

// Create a new Todo
router.post("/", async (req, res) => {
  try {
    const { title, detail, date, isCompleted } = req.body;
    const todo = await Todo.create({ title, detail, date, isCompleted });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/////Get filtered todos
router.get("/filter", async (req, res) => {
  const { title, date, dateOperator } = req.query;

  try {
    let whereClause = {};
    console.log("Filter API being called!", new Date(date));

    if (title) {
      whereClause.title = { [Op.like]: `%${title}%` };
    }

    if (date && dateOperator) {
      const operatorsMap = {
        ">": Op.gt,
        "<": Op.lt,
        "=": Op.eq,
      };

      whereClause.date = {
        [operatorsMap[dateOperator]]: new Date(date).toISOString(),
      };
    }

    const todos = await Todo.findAll({ where: whereClause });
    if (!todos) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a single Todo by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("filter is not called!");
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a Todo by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, detail, date, isCompleted } = req.body;
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await todo.update({ title, detail, date, isCompleted });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await todo.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
