const express = require("express");
require("dotenv").config();
const db = require("./models");
const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/todos", todoRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
