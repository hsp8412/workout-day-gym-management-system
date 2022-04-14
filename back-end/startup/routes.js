const express = require('express');
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const error = require("../middleware/error");
const branchStaff = require('../routes/branchStaff');
const facility = require('../routes/facility');
const product = require('../routes/product');
const cust = require('../routes/customer');

/*  

TODO
add product and customer and remter {id} query
*/
module.exports = function (app) {
    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/branch_staff', branchStaff)
    app.use('/facility', facility)
    app.use('/customer', cust);
    app.use('/product',product);
    app.use('/customer', cust);
    // app.use('/branch_staff/{stfid}', branchStaff);
    // app.use('/customer/{customerMember}', cust);
    // app.use('/facility{renterId}',faci);
    // app.use('/product{productId}',product);
    app.use(error);
}