const Joi = require("joi");
const mongoose = require("mongoose");
const GameScore = mongoose.model(
  "GameScore",
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
    userEmail: {
      type: String,
      minlength: 3,
      maxlength: 100,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"]
    },
    lang: {
      type: String
    },
    lifes: {
      type: Number
    },
    gameTime: {
      type: Number
    },
    stateOfGame: {
      type: String
    },
    quote: {
      type: String
    }
  })
);

function validateGameScore(reqScore) {
  const schema = {
    gameId: Joi.string()
      .min(3)
      .max(100)
      .required(),
    lifes: Joi.string()
      .min(1)
      .max(2)
      .required(),
    gameTime: Joi.string()
      .min(3)
      .max(100)
      .required(),
    stateOfGame: Joi.string()
      .min(2)
      .max(20)
      .required(),
    player: Joi.string()
      .min(3)
      .max(50)
      .required(),
    userEmail: Joi.string()
      .email()
      .required(),
    level: Joi.string()
      .min(3)
      .max(10)
      .required(),
    lang: Joi.string()
      .min(2)
      .max(15)
      .required()
    // quote: Joi.string()
    //   .min(2)
    //   .max(500)
    //   .required()
  };
  return Joi.validate(reqScore, schema);
}

module.exports.GameScore = GameScore;
module.exports.validateGameScore = validateGameScore;
