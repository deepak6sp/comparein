const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");

const generateSimulatedPremiumWins = require('./simulatedPremiumWins');

const generateSimulatedDataRanks = () => {
    // simulated changed values goes here
    // var selectedAgeBand = 'Below 25';
    // var selectedAgeBandChange = -0.25;

    var selectedAgeBandChange = [{ageBand: 'Below 25', simulatedValue: '-0.25'}, {ageBand: '45-54', simulatedValue: '-0.25'}];
    var selectedSiBandChange = [{siBand: 'Below 5K', simulatedValue: '-0.25'}, {siBand: '5K-10k', simulatedValue: '-0.25'}]
    var selectedSuburbChange = 0;
    var brandName = 'AAMI';

    conn.db.collection('rawData').find({}).toArray()
    .then(rdrDocs => {
        
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

        conn.db.collection('simulatedDataRanks').remove({})
        .then(() => {
            conn.db.collection('simulatedDataRanks').insert(newSimulatedData)
            .then(() => {
                generateSimulatedPremiumWins();
            });
        });
    });
}
 

module.exports = generateSimulatedDataRanks;