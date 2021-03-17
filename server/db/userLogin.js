const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('./database');

const UserLogin = db.define('userLogin', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    validate: {
      notNull: {
        msg: 'Please enter a valid password',
      },
      len: [8, 20],
      notEmpty: true,
      notContains: ['password', 'abc'],
    },
    allowNull: false,
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt');
    },
  },
});

module.exports = UserLogin;

/**
 * instanceMethods
 */
UserLogin.prototype.correctPassword = function (candidatePwd) {
  return (
    UserLogin.encryptPassword(candidatePwd, this.salt()) === this.password()
  );
};

/**
 * classMethods
 */
UserLogin.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

UserLogin.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = UserLogin.generateSalt();
    user.password = UserLogin.encryptPassword(user.password(), user.salt());
  }
};

UserLogin.beforeCreate(setSaltAndPassword);
UserLogin.beforeUpdate(setSaltAndPassword);
UserLogin.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});
