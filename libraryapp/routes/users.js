var express = require('express');
var router = express.Router();
var User = require('../models/user');

//POST route for updating data
router.post('/signup', function (req, res) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        User.create(userData, function (err, user) {
            if (err) {
                return err;
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.post('/', function (req, res) {
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (err, user) {
            if (err || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return err;
            } else {
                return res.redirect('/api');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return err;
    }
});

module.exports = router;