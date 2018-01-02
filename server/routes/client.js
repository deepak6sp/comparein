const path = require('path');
const express = require('express');

var clientRouter =  express.Router();

clientRouter.get('/', (req, res, next) => {
    res.redirect('/login');
});

clientRouter.post('/login', (req, res) => {
  console.log("post");
  console.log(req.body);

  res.send({found: false});

});

module.exports = clientRouter;
