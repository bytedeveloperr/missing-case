const { isEmpty, trim } = require("validator")
const response = require("../lib/response")
const User = require("../models/User")
const _ = require("lodash")

class UserService {

	async getSingleUser(_id) {
		try {
			let data = await User.findOne({ _id }).populate("cases").exec()
			return response("User fetched", data, true)
		}catch(e){
			return response("An error occured. try again", null, false)
		}
	} 

	async updateUser(_id, body) {
		try {
			let data = await User.updateOne({ _id }, body)
			return response("User updated", data, true)
		}catch(e){
			return response("An error occured. try again", null, false)
		}
	} 
}

module.exports = new UserService()