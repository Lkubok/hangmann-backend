const mongoose = require('mongoose');
const { Quote, validate } = require('../models/quote');
const read = require('read-data');
const data = read.sync('before_run/quotes.json');  //Its the first step, we will never modify this file, so the method is sync, not async in this case

const { MONGO_URL } = process.env;
const winston = require('winston');

module.exports = function () {
    mongoose.connect(MONGO_URL)
        .then(() => { winston.info(`Connected to database: ${MONGO_URL} with mongoDB server ...`) })
        .then(() => { winston.info(`Checking if ${MONGO_URL} has any collection ...`) })
        .then(async () => {
            try {
                //The part fo restorinng the database if collection of quotes does not exist
                const quotes = await Quote.find();
                if (quotes.length !== 0) {
                    winston.info('Collection exists, quotes not added');
                }
                else {
                    let counter = 0;
                    data.map(async (elem) => {
                        counter++
                        let quoteLength = elem.quoteText.length;
                        // Defining the easness of quote to guess
                        function easness(str) {
                            if (str < 40) { return "easy"; }
                            else if (str < 80) { return "medium"; }
                            else { return "hard" }
                        }
                        //End of defining the easness of quote
                        //If there is no author we do this:
                        let hardness = easness(quoteLength);
                        if (elem.quoteAuthor === "") {
                            elem.quoteAuthor = "Anonymous"
                        }
                        //Making an object to insert it into a DB
                        let quote = new Quote({
                            quoteAuthor: elem.quoteAuthor,
                            insertAuthor: 'admin',      // Only because we do it before the project starts, in the running project it will be set to unique user
                            quote: elem.quoteText,
                            difficulty: hardness
                        })
                        //Saving to DB the unique quote
                        await quote.save();
                    })
                    winston.info(`Collection didnt exist, added ${counter} qoutes`);
                }
            }
            catch (ex) {
                winston.log(ex);
            }
        })
}