const mongoose = require('mongoose');
const config = require('config');
require("dotenv").config();

module.exports = function () {
    // const uri = config.get("db");
    mongoose.connect(process.env.DB_CONNECT_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (e) => {e ? console.log(e) : {}});
}
