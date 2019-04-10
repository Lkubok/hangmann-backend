const {Quote, validate} = require('../models/quote');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
// const auth = require('../middleware/auth');                  // Function to Add in Future
// const admin = require('../middleware/admin');                // Function to Add in Future
// const asyncMiddleware = require('../middleware/async');      // Function to Add in Future


/* START OF GET HTTP ACTIONS */
router.get('/', async (req, res) => {
    const quotes = await Quote.find().sort('dateInsert');
    res.send(quotes);
  });
                                    //API's are returning always one quote
router.get(`/easy`, async (req, res) => {
    const quotes = await Quote.find({difficulty: "easy"}).sort();
    const randomQuote = await Quote.find({difficulty: "easy"}).limit(1).skip(randomize(quotes));
    res.send(randomQuote);
});
router.get(`/medium`, async (req, res) => {
    const quotes = await Quote.find({difficulty: "medium"}).sort();
    const randomQuote = await Quote.find({difficulty: "medium"}).limit(1).skip(randomize(quotes));
    res.send(randomQuote);
});
router.get(`/hard`, async (req, res) => {
    const quotes = await Quote.find({difficulty: "hard"}).sort();
    const randomQuote = await Quote.find({difficulty: "hard"}).limit(1).skip(randomize(quotes));
    res.send(randomQuote);
});
router.get(`/random`, async (req, res) => {
    const quotes = await Quote.find();
    const randomQuote = await Quote.find().limit(1).skip(randomize(quotes));
    res.send(randomQuote);
});
function randomize(collection){
    return Math.floor(Math.random() * collection.length);
}
/* END OF GET ACTIONS */





  module.exports = router;