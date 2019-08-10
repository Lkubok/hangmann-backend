const Joi = require("joi");
const mongoose = require("mongoose");
const Game = mongoose.model(
  "Game",
  new mongoose.Schema({
    gameId: {
      type: String
    },
    player: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
      default: "Anonymous Player"
    },
    quoteId: {
      type: String,
      lowercase: true,
      trim: true
    },
    quoteAuthor: {
      type: String,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"]
    },
    quoteLength: {
      type: Number
    },
    letterToGuess: {
      type: Number
    },
    sendedLetters: {
      type: Array
    },
    lang: {
      type: String
    },
    guessedLetters: {
      type: Number
    },
    lifes: {
      type: String
    }
  })
);

function validateGame(reqNewGame) {
  const schema = {
    player: Joi.string()
      .min(3)
      .max(50)
      .required(),
    level: Joi.string()
      .min(3)
      .max(10)
      .required(),
    lang: Joi.string()
      .min(2)
      .max(15)
      .required()
  };
  return Joi.validate(reqNewGame, schema);
}
function validateCheck(reqCheckGame) {
  const schema = {
    letter: Joi.string()
      .min(1)
      .max(1)
      .required(),
    gameId: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(reqCheckGame, schema);
}

module.exports.Game = Game;
module.exports.validate = validateGame;
module.exports.validateCheck = validateCheck;
