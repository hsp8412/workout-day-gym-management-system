const express = require('express');

const app = express();

require('./startup/routes')(app);
require('./startup/database')();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening at " + port);
});

module.exports = app;
