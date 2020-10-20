const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
	fullName: String,
	email: String,
	phone: String,
	password: String,
	address: String,
	cases: [{ type: Schema.Types.ObjectId, ref: "Case" }]
}, { timestamps: true })

module.exports = model('User', UserSchema)