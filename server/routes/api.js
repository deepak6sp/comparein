const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

var result;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      result = docs;
    });

  });
});

apiRouter.get('/getPremiumWins', (req, res) => {
  res.send(result);
});

module.exports = apiRouter;
