const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function () {
    const uri = process.env.DB_CONNECT_STRING;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (e) => {e ? console.log(e) : {}});
}
