const express = require('express');
/* Route definition start */

const quotes = require('../routes/quotes');
const home = require('../routes/home');
const games = require('../routes/games');

/* Route definition end */
const error = require('../middleware/error');

module.exports = function(app){
    app.use(express.json()) ;
    app.use('/api/quotes', quotes);
    app.use('/', home); 
    app.use('/api/games', games); 
    app.use(express.static('public'));          //We use that to serve static files
    app.use(error);
}