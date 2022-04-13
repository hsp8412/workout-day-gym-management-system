
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/database')();

require("dotenv").config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_STRING);
const db = mongoose.connection;

db.once('open',_=>{
  console.log('Database connected');
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Listening at " + port);
});


// app.get('/good_morning_my_neighbour', (req,res)=>
// {

//   res.json({message:"Fuck you"});

// });




module.exports = app;

