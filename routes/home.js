const express = require("express");
const router = express.Router();
const config = require("config");
const site = config.get("site");

router.get("/", (req, res) => {
  res.render("main", { title: site.title, message: "STRING!" }); // Remove STRING in FUTURE!!!!!!!!!!!!!!
});
router.get("/SysInfo", (req, res) => {
  res.render("sysinfo", {
    title: site.title,
    urlToFetch: "//" + req.get("host") + "/api/sysinfo" // without req.protocol
  });
});
router.get("/About", (req, res) => {
  res.render("about", { title: site.title, message: "ABOUT" });
});
router.get("/Statistics", (req, res) => {
  res.render("statistics", { title: site.title, message: "STATS" });
});
router.get("/Quotes", (req, res) => {
  res.render("quotes", { title: site.title, message: "QUOTES" });
});
router.get("/Users", (req, res) => {
  res.render("users", { title: site.title, message: "USERS" });
});

module.exports = router;
