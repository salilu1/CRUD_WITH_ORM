"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Todos", [
      {
        title: "Learn ORM with node.js",
        detail:
          "Understand how to use ORM with node.js to interact with the database.",
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Do exit exam model",
        detail:
          "Prepare and complete the exit exam model as part of the training.",
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Study JWT and cookie",
        detail:
          "Learn about JSON Web Tokens (JWT) and how to use cookies for authentication.",
        date: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Todos", null, {});
  },
};
