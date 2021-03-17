// The purpose of this module is to bring your Sequelize instance (`db`) together

const db = require('./database');
const Job = require('./job');
const Company = require('./company');
const UserLogin = require('./userLogin');

Company.belongsToMany(Job, { through: 'CompanyJobs' });
Job.belongsTo(Company);
UserLogin.hasMany(Company);
UserLogin.hasMany(Job);

module.exports = {
  db,
  Job,
  Company,
};
