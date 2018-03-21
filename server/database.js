//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
const mongoDB = 'mongodb://deepak:123456@127.0.0.1:27017/compareIn?authSource=admin';
mongoose.connect(mongoDB).then((err) => {
	if(err) {
		console.log("check database connection");
	} else {
		console.log("Database connected");
	}
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const conn = mongoose.connection;

module.exports = conn;
