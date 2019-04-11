const os = require('os');

freeMem = os.freemem();
totalMem = os.totalmem();

module.exports.sysInfoObject = {
    freeMem = os.freemem(),
    totalMem = os.totalmem(),
    hostname = os.hostname(),
    platform = os.platform(),
    osType = os.type(),
    ipAdress = os.networkInterfaces().address
}