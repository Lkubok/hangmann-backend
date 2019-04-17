const {Game, validate, validateCheck} = require('../models/game');
const {Quote} = require('../models/quote');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const randomize = require('../functions/randomize');
const {DB_GAME_TIMEOUT, GAME_LIFES} = process.env;
const winston = require('winston');
const arrayOfLetters = ['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','q','r','s','ś','t','u','v','w','x','y','z','ź','ż'];


router.post('/new', async (req, res) => {
    const { error } =  validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const level = req.body.level;
    const lang = req.body.lang;
    const quotesToDraw = await Quote.find({difficulty: level, lang: lang}).sort();
    const randomQuote = await Quote.find({difficulty: level, lang: lang}).limit(1).skip(randomize(quotesToDraw));
    let quoteToEncode = randomQuote[0].quote;                   //Making an array without any letters to send to Front-end app
    quoteToEncode = quoteToEncode.split('');
    let encodedQuote = [];
    let lettersToGuess = 0;
    quoteToEncode.forEach((element) => {
        if (arrayOfLetters.includes(element)){
          encodedQuote.push('letter to guess');
          lettersToGuess++;
        }
        else encodedQuote.push(element);
    });
    console.log(quoteToEncode);                                 // DEBUG info how it works before and after encoding - DELETE it in next revisions
    console.log('After encoding:');
    console.log(encodedQuote);

    let game = new Game({
      gameId: randomQuote[0]._id+Date.now(),
      player: req.body.player,
      quoteId: randomQuote[0]._id,
      difficulty: level,
      quoteLength: quoteToEncode.length,
      letterToGuess: lettersToGuess,
      lang: lang,
      guessedLetters: 0,
      lifes: GAME_LIFES,
    })
    let sendGame = {
      gameId: game.gameId,
      lettersToguess: encodedQuote,
      lifes: GAME_LIFES,
    }
    // finding a game to delete after period of time
    let gameIdToDel = game._id;
    game = await game.save();
    res.send(sendGame);
    //Deleting the game from DB
    setTimeout(async() => {                                     //Deleting the inactive game from DB 
      const gameToDelete = await Game.findByIdAndDelete(gameIdToDel);
      winston.info(`Deleted game with id: ${gameToDelete._id} after ${DB_GAME_TIMEOUT/60000} minutes`);
    }, DB_GAME_TIMEOUT);                                        //stored in Einveronmental variables with dotenv
  });

router.post('/check', async(req,res) =>{
     const { error } =  validateCheck(req.body); 
     if (error) return res.status(400).send(error.details[0].message);
     const letter = req.body.letter;
     const gameId = req.body.gameId;

     const game = await Game.find({gameId: gameId});
     const quote = await Quote.find({_id: game[0].quoteId});
     const quoteTextArray = quote[0].quote.split('');

     let arrayToRespond =[];
     quoteTextArray.forEach(async(element, index) => {
      if (element === letter){
        arrayToRespond.push(index);
        game.set({
          guessedLetters: 2,
        })


      }
      const result = await game.save();
  });

  res.send(arrayToRespond);
})

  module.exports = router;