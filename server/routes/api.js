const path = require('path');
const express = require('express');

var apiRouter =  express.Router();
var conn = require('../database');

var resultX=[];
var resultY=[];
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      docs.forEach((ele,i) => {
        resultX.push(ele.brand);
        resultY.push(ele.wins);
      });
    });

  });
});

apiRouter.get('/getPremiumWins', (req, res) => {
  res.send([{x: resultX, y: resultY, type: 'bar'}]);
});

module.exports = apiRouter;
