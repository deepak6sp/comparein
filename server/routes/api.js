const path = require('path');
const express = require('express');

const apiRouter =  express.Router();
const conn = require('../database');

const generateRawDataRanks = require('../controller/generateData/rawDataRanks');
const generateSimulatedDataRanks = require('../controller/generateSimulatedData/simulatedDataRanks');

conn.on('open', function () {
  console.log("opened");
  generateRawDataRanks();
  
});


var ageQtesWinsResult,
    ageBandRelResult,
    siQtesWinsResult,
    siBandRelResult,
    simulatedAgeQtesWinsResult,
    simulatedSiQtesWinsResult;


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

apiRouter.post('/generateSimulatedDataRanks', (req,res) => {
  let data = req.body;
  console.log(data);
  generateSimulatedDataRanks(data);
});


apiRouter.get('/getSimulatedPremiumWins', (req, res) => {
  conn.db.collection('simulatedPremiumWins').find().toArray()
  .then(docs => res.send(docs));
});

apiRouter.post('/getSimulatedAgeQtesWins', (req, res) => {
  conn.db.collection('simulatedAgeQtesWins').find().toArray()
  .then(docs => {
     simulatedAgeQtesWinsResult = docs.filter(value => value.brand == req.body.brandName);
     res.send(simulatedAgeQtesWinsResult);
  });
}).get('/getSimulatedAgeQtesWins', (req, res) => {
  res.send(simulatedAgeQtesWinsResult);
});

apiRouter.post('/getSimulatedSiQtesWins', (req, res) => {
  conn.db.collection('simulatedSiQtesWins').find().toArray()
  .then(docs => {
      simulatedSiQtesWinsResult = docs.filter(value => value.brand == req.body.brandName);
      res.send(simulatedSiQtesWinsResult);
  });
}).get('/getSimulatedSiQtesWins', (req, res) => {
  res.send(simulatedSiQtesWinsResult);
});


apiRouter.post('getInitialAndSimulatedData', (req,res) => {
  let initialPMPromise = new Promise((resolve,request) => {
    conn.db.collection('premiumWins').find().toArray()
    .then(docs => resolve(docs));
  })
  initialPMPromise.then(initialPMPromiseDocs => {
    conn.db.collection('simulatedPremiumWins').find().toArray()
    .then(docs => res.send({
        marketSummary: {
          intialData: initialPMPromiseDocs,
          simulatedData: docs
        }
      }
    ));
  });
}).get('/getInitialAndSimulatedData', (req, res) => {
  let initialPMPromise = new Promise((resolve,request) => {
    conn.db.collection('premiumWins').find().toArray()
    .then(docs => resolve(docs));
  })
  initialPMPromise.then(initialPMPromiseDocs => {
    conn.db.collection('simulatedPremiumWins').find().toArray()
    .then(docs => res.send({
        marketSummary: {
          intialData: initialPMPromiseDocs,
          simulatedData: docs
        }
      }
    ));
  });
});;


module.exports = apiRouter;
