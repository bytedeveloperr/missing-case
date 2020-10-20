const { isEmpty, isLength, isEmail, normalizeEmail, trim } = require("validator")
const response = require("../lib/response")
const User = require("../models/User")
const argon2 = require("argon2")
const _ = require("lodash")

class AuthService {
	
	async register(data) {
		let { fullName, email, password } = data
		if (isEmpty(fullName) || isEmpty(email) || isEmpty(password)) {
			return response("All fields are required", null, false)
		}
		if (!isEmail(email)) {
			return response("Enter a valid email", null, false)
		}
		if(!isLength(password, { min: 6 })) {
			return response("Password must not be less than six characters", null, false)
		}	
	    fullName = trim(fullName)
		email = trim(normalizeEmail(email))
		password = trim(password)

		try {
			password = await argon2.hash(password)
			let userExists = await User.findOne({ email })
			if(userExists){
				return response("A user already registered with the email.", null, false)
			}
			let user = new User({ fullName, email, password })
			user = _.pick(await user.save(), ['_id'])
			return response('Registered!', user, true)
		}catch(e) {
			return response(`Oops..., an error occured. try again`, null, false)
		}
	}

	async login(data) {
		let { email, password } = data
		if (isEmpty(email) || isEmpty(password)) {
			return response("All fields are required", null, false)
		}
		if (!isEmail(email)) {
			return response("Enter a valid email", null, false)
		}
		if(!isLength(password, { min: 6 })) {
			return response("Password must not be less than six characters", null, false)
		}	
		email = trim(normalizeEmail(email))
		password = trim(password)

		try {
			let user = await User.findOne({ email })
			if(user) {
				let isVerified = await argon2.verify(user.password, password)
				if(isVerified){
					return response('Logging in!', user, true)
				}
				return response("Incorrect password", null, false)
			}
			return response("The email hasn't been registered with us", null, false)
		}catch(e) {
			return response(`Oops..., an error occured. try again`, null, false)
		}
	}
}

module.exports = new AuthService()