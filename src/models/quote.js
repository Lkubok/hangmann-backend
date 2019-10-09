const Joi = require("joi");
const mongoose = require("mongoose");
const Quote = mongoose.model(
  "Quote",
  new mongoose.Schema({
    quoteAuthor: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "Anonymous"
    },
    insertAuthor: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true
    },
    quote: {
      type: String,
      lowercase: true,
      trim: true
    },
    dateInsert: {
      type: Date,
      default: Date.now()
    },
    dateModify: {
      type: Date,
      default: Date.now()
    },
    lang: {
      type: String,
      minlength: 2,
      maxlength: 10,
      required: false,
      lowercase: true,
      default: "eng"
    },
    difficulty: {
      type: String,
      minlength: 3,
      maxlength: 15,
      required: true
    }
  })
);
function validateQuote(quote) {
  const schema = {
    quoteAuthor: Joi.string()
      .min(5)
      .max(255)
      .required(),
    insertAuthor: Joi.string()
      .min(3)
      .max(50)
      .required(),
    quote: Joi.string()
      .min(5)
      .max(255)
      .required(),
    lang: Joi.string()
      .min(2)
      .max(10)
      .required()
  };
  return Joi.validate(quote, schema);
}
module.exports.Quote = Quote;
module.exports.validate = validateQuote;
