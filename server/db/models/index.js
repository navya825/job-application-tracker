const db = require('../database');
const Job = require('./job');
const Company = require('./company');
const UserLogin = require('./userLogin');
const ToDo = require('./toDo');

Company.belongsToMany(Job, { through: 'CompanyJobs' });
Job.belongsTo(Company);
UserLogin.hasMany(Company);
UserLogin.hasMany(Job);
ToDo.belongsTo(UserLogin);

module.exports = {
  db,
  Job,
  Company,
  UserLogin,
  ToDo,
};
