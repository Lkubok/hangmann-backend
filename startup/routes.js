const express = require('express');





module.exports = function(app){
    app.use(express.json()) ;

    // app.use('/', home);    EXAMPLE
    app.use(error);
}