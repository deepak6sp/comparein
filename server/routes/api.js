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

function allFunctions() {
  return {
    createRankDb : (docs) => {
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
      let index = 1;
      let ranksArray = [];
      var createObj = {};
      newSortedValuesRank.forEach((doc) => {
        
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
          ranksArray.push(createObj);
          createObj = {};
        }
        index ++;
    
      });
    
      return ranksArray;
    },
  
    calculateOccurances : (ranksArray) => {
      let occurance = [];
      Object.entries(ranksArray).forEach(([key,brandName]) => {
        // get 1st ranks occurances
        if(brandName.AAMIRank == 1) occurance.push('AAMI');
        if(brandName.AllianzRank == 1) occurance.push('Allianz');
        if(brandName.BingleRank == 1) occurance.push('Bingle');
        if(brandName.ColesRank == 1) occurance.push('Coles');
        if(brandName.RACVRank == 1) occurance.push('RACV');
    
      });
      
      // get total number of individual brand ranks
      let count = occurance.reduce((acc, curr) => {
    
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
    
        return acc;
      }, {});
    
      let newAcc = [];
      Object.entries(count).forEach(([key,val]) => {
        newAcc.push({brand: key, wins: val})
      });
    
      return newAcc;
    }
  }
}


conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('rawData', function(err, coll) {
      
      coll.find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0}).toArray(function(err, docs) {
          
          var af = allFunctions();
          const ranksArray = af.createRankDb(docs);
          const premiumWins = af.calculateOccurances(ranksArray);

          conn.db.collection('pw', function(err, spw) {
            spw.remove({}, function(err) {
              spw.insert(premiumWins);
            });
          });
          
          conn.db.collection('rawData', (err, rd) => {
            rd.find({}).toArray((err, rdDocs) => {
              let newRawData = [];
              rdDocs.forEach((doc,index) => {
                newRawData.push(Object.assign(doc, ranksArray[index]));
              });
              conn.db.collection('rawDataRanks', (err, rdr) => {
                rdr.remove({ }, function(err) {
                  rdr.insert(newRawData);
                });
              });
            });
          });
      });
  });


  // simulated changed values goes here
  conn.db.collection('rawDataRanks', function(err, rdr) {
    var selectedAgeBand = '45-54';
    var selectedAgeBandChange = 0;
    var selectedValueChange = 0;
    var selectedSuburbChange = 0;
    var brandName = 'AAMI';

    
    rdr.find({}).toArray(function(err, docs) {

      
      // calculations here
      docs.forEach((ele, i) => {
        if(ele.ageBand == selectedAgeBand) {
          // get new value of simulation
          let newVal = ele[brandName]*
          (1+parseFloat(selectedAgeBandChange))*
          (1+parseFloat(selectedValueChange))*
          (1+parseFloat(selectedSuburbChange));
          ele[brandName] = newVal;
        }
      });

      let newDocs = [];
      // get brand for assigning ranks
      docs.forEach((ele,i) => {
        newDocs.push({"AAMI":ele.AAMI, "Allianz": ele.Allianz, "Bingle": ele.Bingle, "Coles": ele.Coles, "RACV": ele.RACV})
      });

      // get ranks
      var af = allFunctions();
      const ranksArray = af.createRankDb(newDocs);
      const simulatedPremiumWins = af.calculateOccurances(ranksArray);

      console.log(simulatedPremiumWins);

      conn.db.collection('simulatedPremiumWins', function(err, spw) {
        spw.remove({}, function(err) {
          spw.insert(simulatedPremiumWins);
        });
      });
    })
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
