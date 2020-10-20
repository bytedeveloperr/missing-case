const { isEmpty, trim } = require("validator")
const response = require("../lib/response")
const User = require("../models/User")
const Case = require("../models/Case")
const _ = require("lodash")

class CaseService {
	
	async create({ fullName, residentialAddress, lastAddress, lastState, lastSeen, languages, specialChar, lastCloth, age, gender, image, reporter }) {
		if (isEmpty(fullName) || isEmpty(residentialAddress) || isEmpty(lastAddress) || isEmpty(lastState) || isEmpty(languages) || isEmpty(specialChar) || isEmpty(lastCloth) || isEmpty(age) || isEmpty(gender)) {
			return response("All fields are required", null, false)
		}
		fullName = trim(fullName)
		residentialAddress = trim(residentialAddress)
		lastAddress = trim(lastAddress)
		lastState = trim(lastState)
		languages = trim(languages)
		specialChar = trim(specialChar)
		lastCloth = trim(lastCloth)
		age = trim(age)
		gender = trim(gender)
		let newCase = new Case({ fullName, residentialAddress, lastAddress, lastState, lastSeen, languages, specialChar, lastCloth, age, gender, image, reporter })
		try {
			let data = await newCase.save()
			try {
				let user = await User.updateOne({ _id: reporter }, { $push: { cases: data._id } })
				return response("Case Reported!", data, true)
			}catch(e) {
				return response("An error occured. try again", null, false)
			}
		}catch(e) {
			return response("An error occured. try again", null, false)
		}
	}

	async getCases() {
		try {
			let data = await Case.find()
			return response("Cases", data, true)
		}catch(e){
			return response("An error occured. try again", null, false)
		}
	} 

	async getSingleCase(_id) {
		try {
			let data = await Case.findOne({ _id }).populate("reporter").exec()
			return response("Cases", data, true)
		}catch(e){
			return response("An error occured. try again", null, false)
		}
	} 
}

module.exports = new CaseService()