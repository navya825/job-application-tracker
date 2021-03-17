const Sequelize = require('sequelize');
const db = require('../database');

const Job = db.define('job', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  jobType: {
    type: Sequelize.ENUM('internship', 'apprenticeship', 'full-time'),
    defaultValue: 'full-time',
  },
  link: {
    type: Sequelize.TEXT,
  },
  deadline: {
    type: Sequelize.DATE,
  },
  priority: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Job;
