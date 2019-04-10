const express = require('express');
const app = express();  
const winston = require('winston');

require('./startup/logging')();  //it must be first
require('./startup/config')(); 
require('./startup/database')(); 
require('./startup/routes')(app);

app.set('view engine', 'pug');              //Setting a html template engine, node will automaticly load the pug module
app.set('views','./views');                 //This is the same as default

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    winston.info(`Listening on port ${port}`);                          // Displaying port
    winston.info(`Running in environment: ${app.get('env')}`)           // Displaying ENV
    winston.info(`Private server Key: ${process.env.serv_jwt}`)         // Displaying jwtPrivateKey - Delete this in FUTURE, only for debug!!
});