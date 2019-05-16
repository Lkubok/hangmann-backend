const express = require("express");
const { Quote, validate } = require("../models/quote");
const router = express.Router();
const config = require("config");
const site = config.get("site");

/* Counting quotes in db */

async function getQuotes() {
  const quotes = await Quote.find().sort("dateInsert");
  return quotes.length;
}

router.get("/", (req, res) => {
  res.redirect("/About");
});
router.get("/SysInfo", (req, res) => {
  res.render("sysinfo", {
    title: site.title,
    urlToFetch: "//" + req.get("host") + "/api/sysinfo", // without req.protocol
    name: "SysInfo"
  });
});
router.get("/About", (req, res) => {
  res.render("about", { title: site.title, message: "About", name: "About" });
});

router.get("/AddQuote", (req, res) => {
  res.render("addquote", {
    title: site.title,
    message: "AddQuote",
    urlToSend: "//" + req.get("host") + "/api/quotes/add",
    name: "AddQuote"
  });
});
router.get("/Api", (req, res) => {
  res.render("api", { title: site.title, message: "Api", name: "Api" });
});

module.exports = router;
