const express = require("express");
var jwtDecode = require("jwt-decode");

import passportManager from "../config/passport";
const { authenticate } = passportManager;
const router = express.Router();

router.get("/", authenticate, async (req, res, err) => {
  const decoded = jwtDecode(req.headers.authorization);
  const { email, username } = decoded;

  res
    .status(200)
    .send({ message: "User logged in", username: username, email: email });
});

module.exports = router;
