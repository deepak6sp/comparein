const conn = require('../database');
const sharedFunctions = require("./shared_functions.js");

var premiumWinsResult,
    ageQtesWinsResult,
    getAgeQtesWinsResult,
    ageBandRelResult,
    getAgeBandRelResult,
    siQtesWinsResult,
    getsiQtesWinsResult,
    siBandRelResult,
    getSiBandRelResult;

var simulatedPremiumWinsResult;

var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];


conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
conn.on('open', function () {
  conn.db.collection('rawData', function(err, coll) {
      
      coll.find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0}).toArray()
      .then(function(err, docs) {

          // get ranks, join with current rawData and
          // insert records to 'rawDataRanks' collection
          const ranksArray = sharedFunctions.createRankDb(docs);

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
      const premiumWins = sharedFunctions.calculatePremiumWins(rdDocs);
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
    // var selectedAgeBand = 'Below 25';
    // var selectedAgeBandChange = -0.25;

    var selectedAgeBandChange = [{ageBand: 'Below 25', simulatedValue: '-0.25'}, {ageBand: '45-54', simulatedValue: '-0.25'}];
    var selectedSiBandChange = [{siBand: 'Below 5K', simulatedValue: '-0.25'}, {siBand: '5K-10k', simulatedValue: '-0.25'}]
    var selectedSuburbChange = 0;
    var brandName = 'AAMI';

    
    
    rdr.find({}).toArray(function(err, rdrDocs) {
      
      // calculations here
      rdrDocs.forEach((ele, i) => {
        let newVal = 0;
        selectedAgeBandChange.forEach((bandChange, index) => {
          if(ele.ageBand == bandChange.ageBand) {
            // get new value of simulation
            newVal = ele[brandName]*
            (1+parseFloat(bandChange.simulatedValue))*
            (1+parseFloat(selectedSuburbChange));
  
            ele[brandName] = newVal;
          }
          
        });
        selectedSiBandChange.forEach((bandChange, index) => {
          if(ele.siBand == bandChange.siBand) {
            // get new value of simulation
            newVal = newVal*
            (1+parseFloat(bandChange.simulatedValue))*
            (1+parseFloat(selectedSuburbChange));
  
            ele[brandName] = newVal;
          }
          
        })
        
      });

      let newDocs = [];
      // get brand for assigning ranks
      rdrDocs.forEach((ele,i) => {
        newDocs.push({"AAMI":ele.AAMI, "Allianz": ele.Allianz, "Bingle": ele.Bingle, "Coles": ele.Coles, "RACV": ele.RACV})
      });

      // get ranks
      const ranksArray = sharedFunctions.createRankDb(newDocs);

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
      const simulatedPremiumWins = sharedFunctions.calculatePremiumWins(sdrDocs);
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

});