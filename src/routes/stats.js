const { Quote } = require("../models/quote");
const { GameScore } = require("../models/gameScore");
const express = require("express");
const router = express.Router();
const winston = require("winston");

router.get("/", async (req, res) => {
  let langs = [];

  const quotes = await Quote.find();
  quotes.forEach(el => {
    if (!langs.includes(el.lang)) langs.push(el.lang);
  });
  const gameScores = await GameScore.find();
  const deadGames = await GameScore.find({ stateOfGame: "dead" });
  const winGames = await GameScore.find({ stateOfGame: "win" });
  const quickestGame = await GameScore.find()
    .sort("gameTime")
    .limit(1);
  const objToSend = {
    quotesCount: quotes.length,
    langs: langs,
    games: gameScores.length,
    deadGames: deadGames.length,
    winGames: winGames.length,
    quickestGame: quickestGame[0],
    quickestWinGames: await GameScore.find({ stateOfGame: "win" })
      .sort("gameTime")
      .limit(3)
  };

  res.status(200).send(objToSend);
});

module.exports = router;
