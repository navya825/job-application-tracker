const Sequelize = require('sequelize');
const db = require('../database');

const ToDo = db.define('toDo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = ToDo;
