const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    const uri = config.get("db");
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (e) => {e ? console.log(e) : {}});
}
