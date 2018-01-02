const path = require('path');
const express = require('express');

var adminRouter =  express.Router();
var conn = require('../database');


adminRouter.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
});

// adminRouter.get('/users', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../index.html'));
// });

module.exports = adminRouter;
