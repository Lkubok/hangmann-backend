const express = require('express');
const router = express.Router(); 
const config = require('config');
const site = config.get('site');

router.get('/', (req, res) => {

    res.render('main', {title: site.title, message: 'STRING!' });



    // res.send('HELLO')

});
router.get('/Quotes', (req, res) => {

    res.render('quotes', {title: site.title, message: 'STRING!' });



    // res.send('HELLO')

});




module.exports = router;