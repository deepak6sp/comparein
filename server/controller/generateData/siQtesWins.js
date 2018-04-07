const conn = require('../../database');
const sharedFunctions = require("../shared_functions.js");
  
var brandNames = ["AAMI", "Allianz", "Bingle", "Coles", "RACV"];

const generateSiQtesWins = () => {
    let tempSiWinsPromise = new Promise((resolve, reject) => { 
        conn.db.collection('tempSiWins').deleteMany({})
        .then(()=> {
            brandNames.forEach((ele,index) => {
                conn.db.collection('rawDataRanks').aggregate([
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
                    conn.db.collection('tempSiWins').insert(docs)
                    .then(() => {
                        if(index >= brandNames.length-1) {
                            resolve("tempSiWinsPromiseSolved");
                        }
                    });
                });
            });
        });
    });
    

    let tempSiQtesPromise = new Promise((resolve, reject) => {
        tempSiWinsPromise.then(msg => {
            if(msg == 'tempSiWinsPromiseSolved') {
                conn.db.collection('tempSiQtes').deleteMany({})
                .then(() => {
                    brandNames.forEach((ele,index) => {
                        conn.db.collection('tempSiWins').aggregate([
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
                            conn.db.collection('tempSiQtes').insert(docs)
                            .then(() => {
                                if(index >= brandNames.length-1) {
                                    resolve("tempSiQtesPromiseSolved");
                                }
                            });
                        });
                    });
                });
            }
        });
    });

    tempSiQtesPromise.then(msg => {
        if(msg == "tempSiQtesPromiseSolved") {
            console.log(msg);
        
            conn.db.collection('tempSiWins').aggregate([
                {
                    $lookup: {
                        from: "tempSiQtes",
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
                conn.db.collection('siQtesWins').deleteMany({})
                .then( () => {
                    conn.db.collection('siQtesWins').insert(docs)
                    .then( () => {
                        conn.db.collection('tempSiWins').drop();
                        conn.db.collection('tempSiQtes').drop();
                    });
                });
                
            })
        }
        
    });
}

module.exports = generateSiQtesWins;
