const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

var premiumWinsResult, ageWinsResult, getAgeWinsResult;

conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      premiumWinsResult = docs;
    });
  });
  conn.db.collection('ageQtesWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      ageWinsResult = docs;
    });
  });
});

apiRouter.get('/getPremiumWins', (req, res) => {
  res.send(premiumWinsResult);
});

apiRouter.post('/getAgeQtesWins', (req, res) => {
  getAgeWinsResult = ageWinsResult.filter(value => value.brand == req.body.brandName);
}).get('/getAgeQtesWins', (req, res) => {
  res.send(getAgeWinsResult);
});

module.exports = apiRouter;
