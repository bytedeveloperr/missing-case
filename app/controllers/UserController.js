const UserService = require("../services/UserService")

class UserController {
	
	async singleUser(req, res) {
		let result = await UserService.getSingleUser(req.session._id)
		res.render("profile", { title: "Browse Users", data: result.data })
	}

	async updateUser(req, res) {
		let result = await UserService.updateUser(req.session._id, req.body)
		if(!result.success) {
			req.flash('error', result.text)
			res.redirect('/profile')
		}else{
			res.redirect('/profile')
		}
	}
}

module.exports = new UserController()