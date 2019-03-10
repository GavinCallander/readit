var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req, res) {
    db.user.findById(req.user.id)
    .then(function(user) {
        user.getArticles()
        .then(function(articles) {
            res.render('list', {user, articles})
        });
    });
});

router.post('/', function(req, res) {
    db.user.findById(req.user.id)
    .then(function(user) {
        user.createArticle({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            url: req.body.url,
            urlToImage: req.body.urlToImage
        }).then( function(data) {
            res.redirect('/articles')
        });
    });
});

router.delete('/:id', function(req, res) {
    db.usersArticles.destroy({
        where: {articleId: req.params.id, userId: req.user.id}
    }).then(function() {
        res.redirect('/list');
    });
});

module.exports = router;