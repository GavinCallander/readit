'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersArticles = sequelize.define('usersArticles', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  usersArticles.associate = function(models) {
    // associations can be defined here
  };
  return usersArticles;
};