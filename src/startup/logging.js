require('express-async-errors');                //It catches errors as in try catch blocks
const winston = require('winston');             //Winston Logger, Install the 2.4.0 Version!!!!!!!!



module.exports = function () {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'UncaughtExceptons.log' })
        );

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
    winston.add(winston.transports.File, { filename: 'logfile.log' });
}