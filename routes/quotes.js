const { Quote, validate } = require("../models/quote");
// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const randomize = require("../functions/randomize");

// const auth = require('../middleware/auth');                  // Function to Add in Future
// const admin = require('../middleware/admin');                // Function to Add in Future
// const asyncMiddleware = require('../middleware/async');      // Function to Add in Future

/* START OF GET HTTP ACTIONS */
// /api/quotes - returns all quotes in DB
router.get("/", async (req, res) => {
  const quotes = await Quote.find().sort("dateInsert");
  res.send(quotes);
});
//API's are returning always one quote
router.get(`/easy`, async (req, res) => {
  const quotes = await Quote.find({ difficulty: "easy" }).sort();
  const randomQuote = await Quote.find({ difficulty: "easy" })
    .limit(1)
    .skip(randomize(quotes));
  res.send(randomQuote);
});
router.get(`/medium`, async (req, res) => {
  const quotes = await Quote.find({ difficulty: "medium" }).sort();
  const randomQuote = await Quote.find({ difficulty: "medium" })
    .limit(1)
    .skip(randomize(quotes));
  res.send(randomQuote);
});
router.get(`/hard`, async (req, res) => {
  const quotes = await Quote.find({ difficulty: "hard" }).sort();
  const randomQuote = await Quote.find({ difficulty: "hard" })
    .limit(1)
    .skip(randomize(quotes));
  res.send(randomQuote);
});
router.get(`/random`, async (req, res) => {
  const quotes = await Quote.find();
  const randomQuote = await Quote.find()
    .limit(1)
    .skip(randomize(quotes));
  res.send(randomQuote);
});
/* router.get(`/:limit?`, async (req, res) => {
  const quotes = await Quote.find();
  console.log(req.params.limit);

  const limitsQoute = await Quote.find()
    .limit(parseInt(req.params.limit))
    .skip(randomize(quotes));
  res.send(limitsQoute);
}); */ 1;
/* END OF GET ACTIONS */
/* POST ACTIONS START */

router.post(`/add`, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const quotes = await Quote.find().sort("dateInsert");
  let quotesArray = [];
  quotes.map(element => {
    //Making an array of quotes to compare with given quote from browser
    quotesArray.push(element.quote);
  });
  if (quotesArray.includes(req.body.quote.toLowerCase())) {
    res.send({
      status: "rejected",
      message: "Quote already in Database"
    });
  } else {
    // Searching if quote is already in Database

    const quoteToInsert = req.body.quote.toLowerCase();
    /* REFACTOR CODE HERE */
    function writeDifficulty(str) {
      // Export this function in future
      if (str.length < 40) {
        return "easy";
      } else if (str.length < 80) {
        return "medium";
      } else {
        return "hard";
      }
    }
    let newQuote = new Quote({
      quoteAuthor: req.body.quoteAuthor,
      insertAuthor: req.body.insertAuthor,
      quote: quoteToInsert,
      lang: req.body.lang,
      difficulty: writeDifficulty(quoteToInsert)
    });
    newQuote = await newQuote.save();
    res.send({
      status: "accepted",
      message: "Quote added to Database",
      quoteObject: newQuote
    });
  }
});

/* END OF POST ACTIONS */
module.exports = router;
