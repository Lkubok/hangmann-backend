const express = require("express");
const router = express.Router();
const os = require("os");
const toHuman = require("../functions/toHuman");

router.get("/", (req, res) => {
  const date = new Date();
  const sysOb = {
    freeMem: toHuman(os.freemem()),
    totalMem: toHuman(os.totalmem()),
    hostname: os.hostname(),
    release: os.release(),
    osType: os.type(),
    cpuModel: os.cpus()[0]["model"],
    cpuSpeed: `${os.cpus()[0]["speed"]} MHz`,
    currentDate: `${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}`,
    currentTime: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`,
    url: req.protocol + "://" + req.get("host")
  };
  res.send(sysOb);
});

module.exports = router;
