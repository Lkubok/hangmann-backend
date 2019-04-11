require('dotenv').config({ path: './config/variables.env' });       //Configure system variables, change variables when DEPLOY!!

const express = require('express');
const app = express();  
const winston = require('winston');

require('./startup/logging')();  //it must be first
require('./startup/database')(); 
require('./startup/routes')(app);

app.set('view engine', 'pug');              //Setting a html template engine, node will automaticly load the pug module
app.set('views','./views');                 //This is the same as default

const port = process.env.PORT || process.env.SERV_PORT;     // SERV_PORT is my own varaible defined to work with front-end on one environment

app.listen(port, ()=>{
    winston.info(`Listening on port ${port}`);                          // Displaying port
    winston.info(`Running in environment: ${app.get('env')}`)           // Displaying ENV
    winston.info(`Private server Key: ${process.env.SERV_JWT}`)  //DELETE       // Displaying jwtPrivateKey - Delete this in FUTURE, only for debug!!
    winston.info(`Mongo URL: ${process.env.MONGO_URL}`)          //DELETE       // Displaying URL to Database - Delete this in FUTURE, only for debug!!
});