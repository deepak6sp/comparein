const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");
  
var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];

const generateAgeQtesWins = () => {
    let tempAgeWinsPromise = new Promise((resolve, reject) => { 
        conn.db.collection('tempAgeWins').deleteMany({})
        .then(()=> {
            brandNames.forEach((ele,index) => {
                conn.db.collection('rawDataRanks').aggregate([
                    {"$group" : {
                        "_id":{"brand": ele, "ageBand": "$ageBand", "rank":`${"$"+ele+"Rank"}`, "ageGroup": "$ageGroup"},
                        wins: {$sum: 1}, asp: {$avg:`${"$"+ele}`},
                    }},
                    {"$project" : {
                        "_id":0, "brand": "$_id.brand", "ageBand": "$_id.ageBand", "ageGroup": "$_id.ageGroup",
                        "rank": "$_id.rank", wins:"$wins", asp: "$asp", 
                    }},
                ]).toArray()
                .then(docs => {
                    conn.db.collection('tempAgeWins').insert(docs)
                    .then(() => {
                        if(index >= brandNames.length-1) {
                            resolve("tempAgeWinsPromiseSolved");
                        }
                    });
                });
            });
        });
    });
    

    let tempAgeQtesPromise = new Promise((resolve, reject) => {
        tempAgeWinsPromise.then(msg => {
            if(msg == 'tempAgeWinsPromiseSolved') {
                conn.db.collection('tempAgeQtes').deleteMany({})
                .then(() => {
                    brandNames.forEach((ele,index) => {
                        conn.db.collection('tempAgeWins').aggregate([
                            {"$group" : {
                                "_id":{"brand": ele, "ageBand": "$ageBand", "rank":"$rank"}, 
                                quotes: {$sum: "$wins"}, 
                            }},
                            {"$project" : {
                                "_id":0, "brand": "$_id.brand", "ageBand": "$_id.ageBand",
                                "rank":"$_id.rank", quotes: "$quotes"
                            }},
                        ]).toArray()
                        .then((docs) => {
                            conn.db.collection('tempAgeQtes').insert(docs)
                            .then(() => {
                                if(index >= brandNames.length-1) {
                                    resolve("tempAgeQtesPromiseSolved");
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    tempAgeQtesPromise.then(msg => {
        if(msg == "tempAgeQtesPromiseSolved") {
            console.log(msg);
        
            conn.db.collection('tempAgeWins').aggregate([
                {
                    $lookup: {
                        from: "tempAgeQtes",
                        localField: "ageBand",    // field in the orders collection
                        foreignField: "ageBand",  // field in the items collection
                        as: "fromItems"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { fromItems: 0 } }
            ]).toArray()
            .then( docs => {
                conn.db.collection('ageQtesWins').deleteMany({})
                .then( () => {
                    conn.db.collection('ageQtesWins').insert(docs)
                    .then( () => {
                        conn.db.collection('tempAgeWins').drop();
                        conn.db.collection('tempAgeQtes').drop();
                    });
                });
                
            })
        }
        
    });
}

module.exports = generateAgeQtesWins;
