const path = require('path');
const express = require('express');

const apiRouter =  express.Router();


require("../controller/controller.js");


// all main routes
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


//all simulated routes
apiRouter.get('/getSimulatedPremiumWins', (req, res) => {
  res.send(simulatedPremiumWinsResult);
});



module.exports = apiRouter;
