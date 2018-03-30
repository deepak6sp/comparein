const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");


const generateSimulatedPremiumWins = () => {
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
}

module.exports = generateSimulatedPremiumWins;
