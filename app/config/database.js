const mongoose = require("mongoose")

const connectDB = () => {
	mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('connected to database')
	})
	.catch(e => {
		console.log(`Unable to connect to database: ${e}`)
	})
}

module.exports = connectDB