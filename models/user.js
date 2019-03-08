'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid user name. Must be between 1 and 99 characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: 'Invalid email address'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Invalid password. Must be 8 characters or more'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options) {
        if (pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        };
      }
    }
  });
  user.associate = function(models) {
    models.user.belongsToMany(models.article, {through: 'usersArticles'});
  };
  // Function to compare entered password to hashed password
  user.prototype.validPassword = function(passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };
  // Function to remove password before sending the user object
  user.prototype.toJSON = function() {
    var userData = this.get();
    delete userData.password;
    return userData;
  };

  return user;
};