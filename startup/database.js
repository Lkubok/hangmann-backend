const config = require('config');
const db = config.get('db');
const mongoose = require('mongoose');
const host = db.host;
const database = db.database;
const winston = require('winston');

module.exports = function(){
mongoose.connect(`mongodb://${host}/${database}`)
    .then(()=>{winston.info(`Connected to database: ${database} on host: ${host} with mongoDB server ...`)})
}