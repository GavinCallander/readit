var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.put('/profile', function(req, res) {
    db.user.update({
        name: req.body.name
    }, {where: {id: req.user.id} 
    }).then(function(name, created) {
        res.redirect('/profile');
    });
});

module.exports = router;