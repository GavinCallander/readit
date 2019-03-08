'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    urlToImage: DataTypes.STRING
  }, {});
  article.associate = function(models) {
    models.article.belongsToMany(models.user, {through: 'usersArticles'});
  };
  return article;
};