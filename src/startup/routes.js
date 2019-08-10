const express = require("express");
/* Route definition start */

const quotes = require("../routes/quotes");
const home = require("../routes/home");
const games = require("../routes/games");
const sysinfo = require("../routes/sysinfo");
const stats = require("../routes/stats");

/* Route definition end */
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/quotes", quotes);
  app.use("/", home);
  app.use("/api/games", games);
  app.use("/api/sysinfo", sysinfo);
  app.use("/api/stats", stats);
  app.use(express.static("public")); //We use that to serve static files
  app.use(error);
};
