const path = require('path');
const express = require('express');

var clientRouter =  express.Router();


clientRouter.get('/', (req, res) => {
    res.redirect('/login');
});


module.exports = clientRouter;
