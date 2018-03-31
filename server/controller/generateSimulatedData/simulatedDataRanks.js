const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");

const generateSimulatedPremiumWins = require('./simulatedPremiumWins');
const generateSimulatedAgeQtesWins = require('./simulatedAgeQtesWins');
const generateSimulatedSiQtesWins = require('./simulatedSiQtesWins');

const generateSimulatedDataRanks = (data) => {
    console.log('generateSimulatedDataRanks');
    console.log(data);

    // let selectedAgeBandChange = [data.ageBandChnage];
    // let selectedSiBandChange = [data.siBandChange];
    let selectedAgeBandChange = [{ageBand: 'Below 25', simulatedValue: 0},{ageBand: '45-54', simulatedValue: 0}];
    let selectedSiBandChange = [{siBand: 'Below 5K', simulatedValue: 0}]
    let selectedSuburbChange = 0;
    let brandName = 'AAMI';

    conn.db.collection('rawData').find({}).toArray()
    .then(rdrDocs => {

        let newDocs = [];
        // simulation calculations here
        rdrDocs.forEach((ele, i) => {
            let newVal = 0;
            selectedAgeBandChange.forEach((bandChange, index) => {
                if(ele.ageBand == bandChange.ageBand) {
                    // get new value of simulation
                    newVal = ele[brandName]*
                    (1+parseFloat(bandChange.simulatedValue))*
                    (1+parseFloat(selectedSuburbChange));
                    
                    //if value has not changed
                    if(newVal != 0){
                        ele[brandName] = newVal;
                    } else {
                        ele[brandName] = ele[brandName];
                    }
                    
                }
            });
            selectedSiBandChange.forEach((bandChange, index) => {
                if(ele.siBand == bandChange.siBand) {
                    // get new value of simulation
                    newVal = newVal*
                    (1+parseFloat(bandChange.simulatedValue))*
                    (1+parseFloat(selectedSuburbChange));

                    // if value has not changed
                    if(newVal != 0){
                        ele[brandName] = newVal;
                    } else {
                        ele[brandName] = ele[brandName];
                    }
                }
            });
            newDocs.push({"AAMI":ele.AAMI, "Allianz": ele.Allianz, "Bingle": ele.Bingle, "Coles": ele.Coles, "RACV": ele.RACV});
        });
        // get ranks
        const ranksArray = sharedFunctions.createRankDb(newDocs);

        let newSimulatedData = [];
        rdrDocs.forEach((doc,index) => {
            newSimulatedData.push(Object.assign(doc, ranksArray[index]));
        });

        console.log("create simulatedDataRanks");
        conn.db.collection('simulatedDataRanks').deleteMany({})
        .then(() => {
            conn.db.collection('simulatedDataRanks').insert(newSimulatedData)
            .then(() => {
                generateSimulatedPremiumWins();
                generateSimulatedAgeQtesWins();
                generateSimulatedSiQtesWins();
            });
        });
    });
}
 

module.exports = generateSimulatedDataRanks;