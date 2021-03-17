const Sequelize = require('sequelize');
const db = require('../database');

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.unsplash.com/photo-1585422168344-4d9e7a8c91ee?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3QlMjBwbGFudHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
  },
});

module.exports = Company;
