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

var simulatedPremiumWinsResult;

var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];

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
  
    calculatePremiumWins : (docs) => {
      let wins = {AAMI: 0, Allianz: 0, Bingle: 0, Coles:0, RACV:0};
      let premium = { AAMI: 0, Allianz: 0, Bingle: 0, Coles:0, RACV:0};

      Object.entries(docs).forEach(([key,brand]) => {
        // get 1st ranks occurances
        
        if(brand.AAMIRank == 1) {
          wins.AAMI++;
          premium.AAMI += brand.AAMI;
        }
        if(brand.AllianzRank == 1) {
          wins.Allianz++;
          premium.Allianz += brand.Allianz;
        }
        if(brand.BingleRank == 1) {
          wins.Bingle++;
          premium.Bingle += brand.Bingle;
        }
        if(brand.ColesRank == 1) {
          wins.Coles++;
          premium.Coles += brand.Coles;
        }
        if(brand.RACVRank == 1) {
          wins.RACV++;
          premium.RACV += brand.RACV;
        }
    
      });
     
      let premiumWins = [];
      Object.entries(wins).forEach(([key,val]) => {
        premiumWins.push({brand: key, wins: val, premium: parseInt((premium[key]/val).toFixed(2))})
      });

      return premiumWins;
    }
  }
}


conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('rawData', function(err, coll) {
      
      coll.find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0}).toArray(function(err, docs) {

          // get ranks, join with current rawData and
          // insert records to 'rawDataRanks' collection
          var af = allFunctions();
          const ranksArray = af.createRankDb(docs);

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


  conn.db.collection('rawDataRanks', (err, rdr) => {
    rdr.find({}).toArray((err, rdDocs) => {

      //get wins and premium and insert it to 'pw' collection 
      var af = allFunctions();
      const premiumWins = af.calculatePremiumWins(rdDocs);
      console.log("premiumWins");
      console.log(premiumWins);
      conn.db.collection('premiumWins', function(err, spw) {
        spw.remove({}, function(err) {
          spw.insert(premiumWins);
        });
      });
    });
  });

  // simulated changed values goes here
  conn.db.collection('rawData', function(err, rdr) {
    var selectedAgeBand = 'Below 25';
    var selectedAgeBandChange = -0.25;
    var selectedValueChange = 0;
    var selectedSuburbChange = 0;
    var brandName = 'Bingle';

    
    rdr.find({}).toArray(function(err, rdrDocs) {

      // calculations here
      rdrDocs.forEach((ele, i) => {
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
      rdrDocs.forEach((ele,i) => {
        newDocs.push({"AAMI":ele.AAMI, "Allianz": ele.Allianz, "Bingle": ele.Bingle, "Coles": ele.Coles, "RACV": ele.RACV})
      });

      // get ranks
      var af = allFunctions();
      const ranksArray = af.createRankDb(newDocs);

      let newSimulatedData = [];
      rdrDocs.forEach((doc,index) => {
        newSimulatedData.push(Object.assign(doc, ranksArray[index]));
      });

      conn.db.collection('simulatedDataRanks', (err, sdr) => {
        sdr.remove({ }, function(err) {
          sdr.insert(newSimulatedData);
        });
      });
    })
  });

  conn.db.collection('simulatedDataRanks', (err, sdr) => {
    sdr.find({}).toArray((err, sdrDocs) => {

      //get wins and premium and insert it to 'pw' collection 
      var af = allFunctions();
      const simulatedPremiumWins = af.calculatePremiumWins(sdrDocs);
      console.log("simulatedPremiumWins");
      console.log(simulatedPremiumWins);
      conn.db.collection('simulatedPremiumWins', function(err, spw) {
        spw.remove({}, function(err) {
          spw.insert(simulatedPremiumWins);
        });
      });
    });
  });


  // conn.db.collection('simulatedDataRanks', (err, sdr) => {
  //   //brand, ageBand, rank
    
  //   brandNames.forEach((ele,index) => {
  //     sdr.aggregate([
  //       {"$group" : {
  //         "_id":{"brand": ele, "ageBand": "$ageBand", "rank":`${"$"+ele+"Rank"}`},
  //         wins: {$sum: 1}, asp: {$avg:`${"$"+ele}`},
  //       }},
  //       {"$project" : {
  //         "_id":0, "brand": "$_id.brand", "ageBand": "$_id.ageBand", 
  //         "rank": "$_id.rank", wins:"$wins", spa: "$asp", 
  //       }},
  //     ]).toArray(function(err, docs) {
  //       conn.db.collection('tempAgeWins', function(err, taw) {
  //         taw.remove({}, function(err) {
  //           taw.insert(docs);
  //         });
  //       });
  //     });
  //   });
  // });

  // conn.db.collection('simulatedDataRanks', (err, sdr) => {
  //   //brand, ageBand, rank
    
  //   brandNames.forEach((ele,index) => {
  //     sdr.aggregate([
  //       {"$group" : {
  //         "_id":{"brand": ele, "siBand": "$siBand", "rank":`${"$"+ele+"Rank"}`},
  //         wins: {$sum: 1}, asp: {$avg:`${"$"+ele}`},
  //       }},
  //       {"$project" : {
  //         "_id":0, "brand": "$_id.brand", "siBand": "$_id.siBand", 
  //         "rank": "$_id.rank", wins:"$wins", spa: "$asp", 
  //       }},
  //     ]).toArray(function(err, docs) {
  //       conn.db.collection('tempSiWins', function(err, taw) {
  //         taw.remove({}, function(err) {
  //           taw.insert(docs);
  //         });
  //       });
  //     });
  //   });
  // });

  // conn.db.collection('simulatedDataRanks', (err, sdr) => {
  //   //brand, ageBand, rank

  //   brandNames.forEach((ele,index) => {
  //     sdr.aggregate([
  //       {"$group" : {"_id": {"brand": ele, "ageBand": "$ageBand"},quotes: {$sum: 1}}},
  //       {"$project" : {"_id":0, "brand": "$_id.brand", "ageBand": "$_id.ageBand", "quotes": "$quotes"}}
  //     ]).toArray(function(err, docs) {
  //       conn.db.collection('tempAgeQuotes', function(err, taq) {
  //         taq.remove({}, function(err) {
  //           taq.insert(docs);
  //         });
  //       });
  //     });
  //   });
  // });

  conn.db.collection('premiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      premiumWinsResult = docs;
    });
  });

  conn.db.collection('simulatedPremiumWins', function(err, coll) {
    coll.find().toArray(function(err, docs) {
      simulatedPremiumWinsResult = docs;
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

apiRouter.get('/getSimulatedPremiumWins', (req, res) => {
  res.send(simulatedPremiumWinsResult);
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
