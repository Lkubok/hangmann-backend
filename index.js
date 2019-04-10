const express = require('express');
const app = express();  
const winston = require('winston');


require('./startup/routes')(app);


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    winston.info(`Listening on port ${port}`);  // Displaying port
    winston.info(app.get('env')) // Displaying ENV
    
});