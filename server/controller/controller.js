const conn = require('../database');
const sharedFunctions = require("./shared_functions.js");

const generateRawDataRanks = require('./generateData/rawDataRanks');

const generateSimulatedDataRanks = require('./generateSimulatedData/simulatedDataRanks');


// var premiumWinsResult,
//     ageQtesWinsResult,
//     getAgeQtesWinsResult,
//     ageBandRelResult,
//     getAgeBandRelResult,
//     siQtesWinsResult,
//     getsiQtesWinsResult,
//     siBandRelResult,
//     getSiBandRelResult;

// var simulatedPremiumWinsResult;

//var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];


conn.on('open', function () {
  console.log("opened");
  generateRawDataRanks();
 

  //generateSimulatedDataRanks();

  // generateSimulatedPremiumWins();

  


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