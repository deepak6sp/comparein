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
    getSiBandRelResult, colescount=0;

var createRankDb = function(docs) {
  let newSortedValuesArray = [];
  let newSortedValuesRank = [];
  // sort array and rearrage brandname 
  docs.forEach((doc, index) => {
    newSortedValuesArray.push(
      Object.keys(doc).sort((a,b) => doc[a]-doc[b])
    );
  });

  //assign key according to sorted array
  newSortedValuesArray.forEach((doc,index) => {
    for(key in doc) {
      newSortedValuesRank.push({"brandName": doc[key], "rank":++key});
    }
  });
  return newSortedValuesRank;
}

conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('rawData', function(err, coll) {
      
      coll.find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0}).toArray(function(err, docs) {
          const res = createRankDb(docs);
          let index = 1;
          let arr = [];
          var createObj = {};
          res.forEach((doc) => {
            
            switch(doc.brandName) {
              case "AAMI":
                createObj.AAMIRank = doc.rank;
                break;
              case "Allianz":
                createObj.AllianzRank = doc.rank;
                break;
              case "Bingle":
                createObj.BingleRank = doc.rank;
                break;
              case "Coles":
                createObj.ColesRank = doc.rank;
                break;
              case "RACV":
                createObj.RACVRank = doc.rank;
                break;
              default :
                break;
            }
            if(index % 5 == 0 && index!=0) {
              arr.push(createObj);
              createObj = {};
            }
            index ++;
          });

          

          conn.db.collection('rawData', (err, coll2) => {
            coll2.find({}).toArray((err, docs2) => {
              docs2.forEach((doc,index) => {
                let obj = {};
                 obj = Object.assign(doc, arr[index])
                 conn.db.collection('generateRawDataRanks', (err, coll2) => {
                  coll2.remove({ }, function(err) {
                    coll2.insert(obj);
                  });
                });
              });
            });
          });
         

          // coll1.remove({ }, function(err) {
          //   coll1.insert(res, function(err) {
          //     coll1.find({}).toArray(function(err, doc1) {

          //       let occurance = [];
          //       doc1.forEach((ele, i) => {
          //         if(ele.rank == 1) {
          //           occurance.push(ele.brandName);
          //         }
          //       });

          //       let count = occurance.reduce((acc, curr) => {
          //         if (typeof acc[curr] == 'undefined') {
          //           acc[curr] = 1;
          //         } else {
          //           acc[curr] += 1;
          //         }
                
          //         return acc;
          //       }, {});

          //       conn.db.collection('simulatedPremiumWins', (err, coll2) => {
          //         coll2.remove({ }, function(err) {
          //           coll2.insert(count);
          //         });
          //       });
          //     });
          //   });
          // });
      });

      
  });

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

apiRouter.get('/temp', (req, res) => {
  res.send({"coles":colescount});
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
