const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");
  
var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];

const generateSimulatedAgeQtesWins = () => {
    let tempSimulatedAgeWinsPromise = new Promise((resolve, reject) => { 
        conn.db.collection('tempAgeWins').deleteMany({})
        .then(()=> {
            brandNames.forEach((ele,index) => {
                conn.db.collection('simulatedDataRanks').aggregate([
                    {"$group" : {
                        "_id":{"brand": ele, "ageBand": "$ageBand", "rank":`${"$"+ele+"Rank"}`},
                        wins: {$sum: 1}, asp: {$avg:`${"$"+ele}`},
                    }},
                    {"$project" : {
                        "_id":0, "brand": "$_id.brand", "ageBand": "$_id.ageBand", 
                        "rank": "$_id.rank", wins:"$wins", asp: "$asp", 
                    }},
                ]).toArray()
                .then(docs => {
                    conn.db.collection('tempSimulatedAgeWins').insert(docs)
                    .then(() => {
                        if(index >= brandNames.length-1) {
                            resolve("tempSimulatedAgeWinsPromiseSolved");
                        }
                    });
                });
            });
        });
    });
    

    let tempSimulatedAgeQtesPromise = new Promise((resolve, reject) => {
        tempSimulatedAgeWinsPromise.then(msg => {
            if(msg == 'tempSimulatedAgeWinsPromiseSolved') {
                conn.db.collection('tempSimulatedAgeQtes').deleteMany({})
                .then(() => {
                    brandNames.forEach((ele,index) => {
                        conn.db.collection('tempSimulatedAgeWins').aggregate([
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
                            conn.db.collection('tempSimulatedAgeQtes').insert(docs)
                            .then(() => {
                                if(index >= brandNames.length-1) {
                                    resolve("tempSimulatedAgeQtesPromiseSolved");
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    tempSimulatedAgeQtesPromise.then(msg => {
        if(msg == "tempSimulatedAgeQtesPromiseSolved") {
            console.log(msg);
        
            conn.db.collection('tempSimulatedAgeWins').aggregate([
                {
                    $lookup: {
                        from: "tempSimulatedAgeQtes",
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
                conn.db.collection('simulatedAgeQtesWins').deleteMany({})
                .then( () => {
                    conn.db.collection('simulatedAgeQtesWins').insert(docs)
                    .then( () => {
                        conn.db.collection('tempSimulatedAgeWins').drop();
                        conn.db.collection('tempSimulatedAgeQtes').drop();
                    });
                });
                
            })
        }
        
    });
}

module.exports = generateSimulatedAgeQtesWins;
