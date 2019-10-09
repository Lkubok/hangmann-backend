const os = require('os');
import toHuman from './toHuman';

module.exports = function getParams(){
    return sysOb = {
        freeMem: toHuman(os.freemem()),
        totalMem: toHuman(os.totalmem()),
        hostname: os.hostname(),
        osType: os.type(),
    }
}