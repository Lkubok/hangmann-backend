const read = require('read-data');
const config = require('config');
const data = read.sync('before_run/quotes.json');  //Its the first step, we will never modify this file, so the method is sync, not async in this case
const db = config.get('db');
const mongoose = require('mongoose');
const host = db.host;
const database = db.database;
const winston = require('winston');
const { Quote } = require('./models/quote')

mongoose.connect(`mongodb://${host}/${database}`)
    .then(() => { winston.info(`Connected to database: ${database} on host: ${host} with mongoDB server ...`) })
    .then( () => {
        data.map(async(elem) => {
            let quoteLength = elem.quoteText.length;
                                  // Defining the easness of quote to guess
            function easness(str){
                if(str<40){return "easy";}
                else if(str<80){return "medium";}
                else{return "hard"}
            }
                                    //End of defining the easness of quote
                                    //If there is no author we do this:
            let hardness = easness(quoteLength);
            if(elem.quoteAuthor === ""){
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
    })