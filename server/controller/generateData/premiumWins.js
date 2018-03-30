const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");

const generatePremiumWins = () => {
    console.log('generatePremiumWins');
    conn.db.collection('rawDataRanks').find({}).toArray()
    .then(rdDocs => {
        //get wins and premium and insert it to 'pw' collection 
        const premiumWins = sharedFunctions.calculatePremiumWins(rdDocs);
        console.log("premiumWins");
        console.log(premiumWins);
        conn.db.collection('premiumWins').deleteMany({})
        .then(() => {
            conn.db.collection('premiumWins').insert(premiumWins);
        });
    });
}

module.exports = generatePremiumWins;
