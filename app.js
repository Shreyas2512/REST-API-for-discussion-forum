const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

mongoose.connect('mongodb://localhost/FinalIntegration', {useNewUrlParser: true}); //posts is the database.
mongoose.Promise = global.Promise; //mongoose promise is depricated

//body-parser middleware (parse json data)
app.use(bodyParser.json())

// initialize routes
app.use('/api', routes);

//middleware for catching the error
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
