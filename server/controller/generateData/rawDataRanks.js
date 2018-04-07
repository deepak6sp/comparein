const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");

const generatePremiumWins = require('./premiumWins');
const generateAgeQtesWins = require('./ageQtesWins');
const generateSiQtesWins = require('./siQtesWins');

const generateRawDataRanks = () => {
    console.log('generateRawDataRanks');
    // conn.db.collection('rawData').find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0}).toArray().then((docs) => {
    //         console.log(docs);
    // });
    conn.db.collection('rawData').find({}).project({ AAMI: 1, Allianz: 1, Bingle: 1, Coles: 1, RACV: 1,_id:0})
    .toArray()
    .then(docs => {
        // get ranks, join with current rawData and
        // insert records to 'rawDataRanks' collection
        const ranksArray = sharedFunctions.createRankDb(docs);

        conn.db.collection('rawData').find({}).toArray()
        .then(rdDocs => {
            
            let newRawData = [];
            rdDocs.forEach((doc,index) => {
                sharedFunctions.assignAgeGroupAndSiGroup(doc);
                newRawData.push(Object.assign(doc, ranksArray[index]));
            });
            conn.db.collection('rawDataRanks').deleteMany({})
            .then(() =>  {
                conn.db.collection('rawDataRanks').insert(newRawData)
                .then(() => {
                    generatePremiumWins();
                    generateAgeQtesWins();
                    generateSiQtesWins();
                });
            });
        });
    });
};

module.exports = generateRawDataRanks;

