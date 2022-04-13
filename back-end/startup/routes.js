const express = require('express');
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const error = require("../middleware/error");
const branchStaff = require('../routes/branchStaff');
const facility = require('../routes/facility');

module.exports = function (app) {
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/branch_staff', branchStaff)
    app.use('/facility', facility)
    app.use(error);
}