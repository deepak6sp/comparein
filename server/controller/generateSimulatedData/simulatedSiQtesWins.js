const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");
  
var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];

const generateSimulatedSiQtesWins = () => {
    let tempSimulatedSiWinsPromise = new Promise((resolve, reject) => { 
        conn.db.collection('tempSimulatedSiWins').deleteMany({})
        .then(()=> {
            brandNames.forEach((ele,index) => {
                conn.db.collection('simulatedDataRanks').aggregate([
                    {"$group" : {
                        "_id":{"brand": ele, "siBand": "$siBand", "rank":`${"$"+ele+"Rank"}`, "siGroup": "$siGroup"},
                        wins: {$sum: 1}, asp: {$avg:`${"$"+ele}`},
                    }},
                    {"$project" : {
                        "_id":0, "brand": "$_id.brand", "siBand": "$_id.siBand", "siGroup": "$_id.siGroup",
                        "rank": "$_id.rank", wins:"$wins", asp: "$asp", 
                    }},
                ]).toArray()
                .then(docs => {
                    conn.db.collection('tempSimulatedSiWins').insert(docs)
                    .then(() => {
                        if(index >= brandNames.length-1) {
                            resolve("tempSimulatedSiWinsPromiseSolved");
                        }
                    });
                });
            });
        });
    });
    

    let tempSimulatedSiQtesPromise = new Promise((resolve, reject) => {
        tempSimulatedSiWinsPromise.then(msg => {
            if(msg == 'tempSimulatedSiWinsPromiseSolved') {
                conn.db.collection('tempSimulatedSiQtes').deleteMany({})
                .then(() => {
                    brandNames.forEach((ele,index) => {
                        conn.db.collection('tempSimulatedSiWins').aggregate([
                            {"$group" : {
                                "_id":{"brand": ele, "siBand": "$siBand", "rank":"$rank"}, 
                                quotes: {$sum: "$wins"}, 
                            }},
                            {"$project" : {
                                "_id":0, "brand": "$_id.brand", "siBand": "$_id.siBand",
                                "rank":"$_id.rank", quotes: "$quotes"
                            }},
                        ]).toArray()
                        .then((docs) => {
                            conn.db.collection('tempSimulatedSiQtes').insert(docs)
                            .then(() => {
                                if(index >= brandNames.length-1) {
                                    resolve("tempSimulatedSiQtesPromiseSolved");
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    tempSimulatedSiQtesPromise.then(msg => {
        if(msg == "tempSimulatedSiQtesPromiseSolved") {
            console.log(msg);
        
            conn.db.collection('tempSimulatedSiWins').aggregate([
                {
                    $lookup: {
                        from: "tempSimulatedSiQtes",
                        localField: "siBand",    // field in the orders collection
                        foreignField: "siBand",  // field in the items collection
                        as: "fromItems"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
                },
                { $project: { fromItems: 0 } }
            ]).toArray()
            .then( docs => {
                conn.db.collection('simulatedSiQtesWins').deleteMany({})
                .then( () => {
                    conn.db.collection('simulatedSiQtesWins').insert(docs)
                    .then( () => {
                        conn.db.collection('tempSimulatedSiWins').drop();
                        conn.db.collection('tempSimulatedSiQtes').drop();
                    });
                });
                
            })
        }
        
    });
}

module.exports = generateSimulatedSiQtesWins;
