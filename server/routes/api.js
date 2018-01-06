const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

var premiumWinsResult, ageWinsResult;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      premiumWinsResult = docs;
    });
  });
  conn.db.collection('ageWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      ageWinsResult = docs;
    });
  });
});

apiRouter.get('/getPremiumWins', (req, res) => {
  res.send(premiumWinsResult);
});

apiRouter.post('/getAgeWins', (req, res) => {
  console.log(req);
  var results = ageWinsResult.filter(value => value.brand == "AAMI");
  //console.log(results);
  res.send(results);
});

module.exports = apiRouter;
