const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const config = require('config');
const page = config.get('page');

router.get('/', (req, res) => {

    res.render('main', {title: page.title, message: 'STRING!' });



    // res.send('HELLO')

});
router.get('/Quotes', (req, res) => {

    res.render('quotes', {title: page.title, message: 'STRING!' });



    // res.send('HELLO')

});




module.exports = router;