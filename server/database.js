const variables = require("../env.js");

//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const dbURI = variables.mongoConnection;
mongoose.connect(dbURI); 
var conn = mongoose.connection;
// mongoose.connect(mongoDB)
// .then((res) => {
// 	if(res) {
// 		console.log("Database connected");
// 	} else {
// 		console.log("check database connections");
// 	}
// });

// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
// //Get the default connection
// const conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create the database connection 


// CONNECTION EVENTS
// When successfully connected
conn.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
conn.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
conn.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
	conn.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

module.exports = conn;
