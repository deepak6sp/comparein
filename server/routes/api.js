const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

var premiumWinsResult,
    ageQtesWinsResult,
    getAgeQtesWinsResult,
    ageBandRelResult,
    getAgeBandRelResult,
    siQtesWinsResult,
    getsiQtesWinsResult,
    siBandRelResult,
    getSiBandRelResult;

conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      premiumWinsResult = docs;
    });
  });
  conn.db.collection('ageQtesWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      ageQtesWinsResult = docs;
    });
  });
  conn.db.collection('ageBandRel', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      ageBandRelResult = docs;
    });
  });
  conn.db.collection('siQtesWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      siQtesWinsResult = docs;
    });
  });
  conn.db.collection('siBandRel', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      siBandRelResult = docs;
    });
  });
});

apiRouter.get('/getPremiumWins', (req, res) => {
  res.send(premiumWinsResult);
});

apiRouter.post('/getAgeQtesWins', (req, res) => {
  getAgeQtesWinsResult = ageQtesWinsResult.filter(value => value.brand == req.body.brandName);
}).get('/getAgeQtesWins', (req, res) => {
  res.send(getAgeQtesWinsResult);
});

apiRouter.post('/getAgeBandRel', (req, res) => {
  getAgeBandRelResult = ageBandRelResult.filter(value => value.brand == req.body.brandName);
}).get('/getAgeBandRel', (req, res) => {
  res.send(getAgeBandRelResult);
});

apiRouter.post('/getSiQtesWins', (req, res) => {
  getSiQtesWinsResult = siQtesWinsResult.filter(value => value.brand == req.body.brandName);
}).get('/getSiQtesWins', (req, res) => {
  res.send(getSiQtesWinsResult);
});

apiRouter.post('/getSiBandRel', (req, res) => {
  getSiBandRelResult = siBandRelResult.filter(value => value.brand == req.body.brandName);
}).get('/getSiBandRel', (req, res) => {
  res.send(getSiBandRelResult);
});




module.exports = apiRouter;
