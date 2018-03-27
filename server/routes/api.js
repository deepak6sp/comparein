const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

var ageQtesWinsResult,
    ageBandRelResult,
    siQtesWinsResult,
    siBandRelResult;


// all main routes
apiRouter.get('/getPremiumWins', (req, res) => {
  conn.db.collection('premiumWins').find().toArray()
  .then(docs => res.send(docs));
});

apiRouter.post('/getAgeQtesWins', (req, res) => {
  conn.db.collection('ageQtesWins').find().toArray()
  .then(docs => {
     ageQtesWinsResult = docs.filter(value => value.brand == req.body.brandName);
     res.send(ageQtesWinsResult);
  });
}).get('/getAgeQtesWins', (req, res) => {
  res.send(ageQtesWinsResult);
});

apiRouter.post('/getAgeBandRel', (req, res) => {
  conn.db.collection('ageBandRel').find().toArray()
  .then(docs => {
      ageBandRelResult = docs.filter(value => value.brand == req.body.brandName);
      res.send(ageBandRelResult);
  });
}).get('/getAgeBandRel', (req, res) => {
  res.send(ageBandRelResult);
});

apiRouter.post('/getSiQtesWins', (req, res) => {
  conn.db.collection('siQtesWins').find().toArray()
  .then(docs => {
      siQtesWinsResult = docs.filter(value => value.brand == req.body.brandName);
      res.send(siQtesWinsResult);
  });
}).get('/getSiQtesWins', (req, res) => {
  res.send(siQtesWinsResult);
});

apiRouter.post('/getSiBandRel', (req, res) => {
  conn.db.collection('siBandRel').find().toArray()
  .then(docs => {
      siBandRelResult = docs.filter(value => value.brand == req.body.brandName);
      res.send(siBandRelResult);
  });
}).get('/getSiBandRel', (req, res) => {
  res.send(siBandRelResult);
});


//all simulated routes
apiRouter.get('/getSimulatedPremiumWins', (req, res) => {
  conn.db.collection('simulatedPremiumWins').find().toArray()
  .then(docs => res.send(docs));
});



module.exports = apiRouter;
