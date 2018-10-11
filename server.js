// importing all the dependencies
const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// importing db schemas..


// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors (Every domain can access the api)
app.use(cors());


app.use((req, res, next) => {
   res.locals.filteredData = null;
   next();
});


// mongoDb config (mongoose)
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })


// importing routers (Api's)
const streamRouter = require('./api/streaming/streamRoutes');
const searchRouter = require('./api/paginatedSearch/search');
const csvRouter = require('./api/csv/csv');

// using routes
app.use('/stream',streamRouter)
app.use('/search',searchRouter)
app.use('/csv',csvRouter)

// Handling unknown routes 
app.use((req, res, next) =>  {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



const port = process.env.PORT || 3000;

app.listen(port,() => {
	console.log('server started at ' + port);
})