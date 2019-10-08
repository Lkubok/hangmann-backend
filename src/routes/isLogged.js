const express = require("express");

import passportManager from "../config/passport";
const { authenticate } = passportManager;
const router = express.Router();
const randomize = require("../functions/randomize");

router.get("/", authenticate, async (req, res, err) => {
  res.status(200).send("User logged in");
});

module.exports = router;
