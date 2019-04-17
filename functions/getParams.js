const os = require('os');
const toHuman = require('./toHuman');

module.exports = function getParams(){

    return sysOb = {
        freeMem: toHuman(os.freemem()),
        totalMem: toHuman(os.totalmem()),
        hostname: os.hostname(),
        osType: os.type(),
    }
}