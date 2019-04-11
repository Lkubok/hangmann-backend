const express = require('express');
const router = express.Router();
const config = require('config');
const site = config.get('site');

const os = require('os');

setInterval(() => {
    getParams();
}, 1000);

function getParams(){
    return sysOb = {
        freeMem: os.freemem(),
        totalMem: os.totalmem(),
        hostname: os.hostname(),
        platform: os.platform(),
        osType: os.type(),
        ipAdress: os.networkInterfaces().address
    }
}



router.get('/', (req, res) => {
    res.render('main', { title: site.title, message: 'STRING!' });
});
router.get('/SysInfo', (req, res) => {
    res.render('sysinfo', { title: site.title, freemem: sysOb.freeMem, totalmem: sysOb.totalMem, hostname: sysOb.hostname, platform: sysOb.platform, ostype: sysOb.osType, adress: sysOb.address});
});
router.get('/About', (req, res) => {
    res.render('about', { title: site.title, message: 'ABOUT' });
});
router.get('/Statistics', (req, res) => {
    res.render('statistics', { title: site.title, message: 'STATS' });
});
router.get('/Quotes', (req, res) => {
    res.render('quotes', { title: site.title, message: 'QUOTES' });
});
router.get('/Users', (req, res) => {
    res.render('users', { title: site.title, message: 'USERS' });
});




module.exports = router;