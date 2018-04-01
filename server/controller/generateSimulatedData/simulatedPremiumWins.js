const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");


const generateSimulatedPremiumWins = () => {
    console.log('generateSimulatedPremiumWins');
    conn.db.collection('simulatedDataRanks').find({}).toArray()
    .then(sdrDocs => {
    
        //get wins and premium and insert it to 'pw' collection 
        const simulatedPremiumWins = sharedFunctions.calculatePremiumWins(sdrDocs);
        console.log("simulatedPremiumWins");
        console.log(simulatedPremiumWins);
        conn.db.collection('simulatedPremiumWins').deleteMany({})
        .then( () => {
            conn.db.collection('simulatedPremiumWins').insert(simulatedPremiumWins);
        });

    });
}

module.exports = generateSimulatedPremiumWins;
