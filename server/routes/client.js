const path = require('path');
const express = require('express');

var clientRouter =  express.Router();


clientRouter.get('/', (req, res) => {
    res.redirect('/login');
});

clientRouter.get('/simulation', (req, res) => {
    res.redirect('/simulation/market-summary');
});




module.exports = clientRouter;
