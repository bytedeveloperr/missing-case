const { Schema, model } = require("mongoose")

const CaseSchema = new Schema({
	fullName: String,
	residentialAddress: String,
	lastAddress: String,
	lastState: String,
	lastSeen: String,
	languages: String,
	specialChar: String,
	lastCloth: String,
	gender: String,
	age: String,
	image: String,
	reporter: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},

}, { timestamps: true })

module.exports = model('Case', CaseSchema)