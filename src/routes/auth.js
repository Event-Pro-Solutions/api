"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("passport");
var passport_local_1 = require("passport-local");
var router = (0, express_1.Router)();
// Query the db for the user and verify the hashed password
passport_1.default.use(new passport_local_1.Strategy(function verify(username, password, cb) {
    return cb(null);
}));
router.post('/login', passport_1.default.authenticate('local'), function (_, res) {
    res.redirect('/');
});
router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
// Hash password and insert new usr to db
router.post('/signup', function (req, res, next) { });
exports.default = router;
