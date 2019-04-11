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
        freeMem: toHuman(os.freemem()),
        totalMem: toHuman(os.totalmem()),
        hostname: os.hostname(),
        osType: os.type(),
    }
}

toHuman = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };


router.get('/', (req, res) => {
    res.render('main', { title: site.title, message: 'STRING!' });
});
router.get('/SysInfo', (req, res) => {
    res.render('sysinfo', { title: site.title, freemem: sysOb.freeMem, totalmem: sysOb.totalMem, hostname: sysOb.hostname, ostype: sysOb.osType});
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