const { Op } = require("sequelize");
const db = require("../models");
const Todo = db.Todo;

exports.createTodo = async (req, res) => {
  try {
    const { title, detail, date, isCompleted } = req.body;
    const todo = await Todo.create({ title, detail, date, isCompleted });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
///Filter todo by parameter
exports.filteredTodo = async (req, res) => {
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
};

exports.getSingleTodo = async (req, res) => {
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
};
exports.updateTodo = async (req, res) => {
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
};

exports.deleteTodo = async (req, res) => {
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
};
