const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); 
const config = require('config');
const page = config.get('page');

router.get('/', (req, res) => {

    res.render('metainfo', {title: page.title, message: 'STRING!' })

});





module.exports = router;