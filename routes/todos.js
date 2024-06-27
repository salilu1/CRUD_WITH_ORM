const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todosControllers");
// Create a new Todo
router.post("/", todoController.createTodo);

// Read all Todo
router.get("/", todoController.getAllTodo);

/////Get filtered todo
router.get("/filter", todoController.filteredTodo);

// Read a single Todo by ID
router.get("/:id", todoController.getSingleTodo);
// Update a Todo by ID
router.put("/:id", todoController.updateTodo);

// Delete a Todo by ID
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
