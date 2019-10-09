const { Game, validate, validateCheck } = require("../models/game");
const { Quote } = require("../models/quote");
const { GameScore, validateGameScore } = require("../models/gameScore");
// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const randomize = require("../functions/randomize");
const { DB_GAME_TIMEOUT, GAME_LIFES } = process.env;
const winston = require("winston");
const arrayOfLetters = [
  "a",
  "ą",
  "b",
  "c",
  "ć",
  "d",
  "e",
  "ę",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "ł",
  "m",
  "n",
  "ń",
  "o",
  "ó",
  "p",
  "q",
  "r",
  "s",
  "ś",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ź",
  "ż"
];

router.post("/stats", async (req, res) => {
  const { error } = validateGameScore(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    gameId,
    player,
    userEmail,
    lang,
    lifes,
    gameTime,
    level,
    stateOfGame
  } = req.body;
  const quoteIdToFind = gameId.slice(0, 24);
  const quote = await Quote.findById(quoteIdToFind);
  let score = new GameScore({
    gameId: gameId,
    player: player,
    userEmail: userEmail,
    difficulty: level,
    lang: lang,
    lifes: parseInt(lifes),
    gameTime: parseInt(gameTime),
    stateOfGame: stateOfGame,
    quote: quote.quote
  });
  await score.save();
  res.status(200).send({ message: "score added" });
});

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const level = req.body.level;
  const lang = req.body.lang;
  const quotesToDraw = await Quote.find({
    difficulty: level,
    lang: lang
  }).sort();
  const randomQuote = await Quote.find({ difficulty: level, lang: lang })
    .limit(1)
    .skip(randomize(quotesToDraw));
  let quoteToEncode = randomQuote[0].quote;
  quoteToEncode = quoteToEncode.split("");
  let encodedQuote = [];
  let lettersToGuess = 0;
  quoteToEncode.forEach(element => {
    if (arrayOfLetters.includes(element)) {
      encodedQuote.push("encoded");
      lettersToGuess++;
    } else encodedQuote.push(element);
  });

  let game = new Game({
    gameId: randomQuote[0]._id + Date.now(),
    player: req.body.player,
    quoteId: randomQuote[0]._id,
    quoteAuthor: randomQuote[0].quoteAuthor,
    difficulty: level,
    quoteLength: quoteToEncode.length,
    letterToGuess: lettersToGuess,
    lang: lang,
    guessedLetters: 0,
    sendedLetters: [],
    lifes: parseInt(GAME_LIFES)
  });
  let sendGame = {
    gameId: game.gameId,
    lettersToGuess: encodedQuote,
    quoteAuthor: game.quoteAuthor,
    lifes: parseInt(GAME_LIFES)
  };
  // finding a game to delete after period of time
  let gameIdToDel = game._id;
  game = await game.save();
  res.status(200).send(sendGame);
  //Deleting the game from DB
  setTimeout(async () => {
    //Deleting the inactive game from DB
    const gameToDelete = await Game.findById(gameIdToDel);
    if (gameToDelete) {
      await Game.findByIdAndDelete(gameIdToDel);
      winston.info(
        `Deleted game with id: ${gameToDelete._id} after ${DB_GAME_TIMEOUT /
          60000} minutes`
      );
    }
  }, DB_GAME_TIMEOUT); //stored in Einveronmental variables with dotenv
});

router.post("/check", async (req, res) => {
  const { error } = validateCheck(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const letter = req.body.letter;
  const gameId = req.body.gameId;
  const game = await Game.findOne({ gameId: gameId });
  const quote = await Quote.findById(game.quoteId);
  const gameLifes = game.lifes;
  const quoteTextArray = quote.quote.split("");
  let arrayToRespond = [];
  let stateOfGame = "";

  if (game.sendedLetters.includes(letter)) {
    stateOfGame = "duplicate";
    // Comparing if sended letter wasnt sended in earlier try
    res.send({ arrayToRespond, stateOfGame });
  } else {
    game.set({
      sendedLetters: [...game.sendedLetters, letter] // Sended letters are stored in Game Document in mongoDB
    });

    quoteTextArray.forEach(async (element, index) => {
      if (element === letter) {
        arrayToRespond.push(index);
        game.set({
          guessedLetters: game.guessedLetters + 1
        });
      }
    });

    if (!quoteTextArray.includes(letter)) {
      // Changing the number of lifes in case of wrong letter sended
      game.set({
        lifes: gameLifes - 1
      });
    }

    if (game.guessedLetters === game.letterToGuess) {
      //Setting The state of Game, checking is user alive or dead
      stateOfGame = "win";
    } else {
      stateOfGame = "alive";
      if (game.lifes <= 0) {
        stateOfGame = "dead";
      } else {
        stateOfGame = "alive";
      }
    }

    await game.save();

    res.send({ arrayToRespond, stateOfGame, lifes: game.lifes }); // Sending the state of game to browser and position of guessed letters
  }
});

router.delete("/delete", async (req, res) => {
  const game = await Game.findOne({ gameId: req.body.gameId });
  if (!game) {
    res.status(400).send("Game with given id not found");
  } else {
    await Game.findOneAndDelete({ gameId: req.body.gameId });
    res.send({ status: "deleted" });
  }
});

module.exports = router;
