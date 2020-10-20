const AuthService = require("../services/AuthService")

class AuthController {

	async renderRegister(req, res) {
		res.render("register", { title: "Register" })
	}

	async postRegister(req, res) {
		let result = await AuthService.register(req.body)
		if(!result.success) {
			req.flash('error', result.text)
			res.redirect('/register')
		}else {
			req.session.isAuth = true
			req.session._id = result.data._id
			res.redirect('/')
		}
		
	}

	async renderLogin(req, res) {
		res.render("login", { title: "Login" })
	}

	async postLogin(req, res) {
		let result = await AuthService.login(req.body)
		if(!result.success) {
			req.flash('error', result.text)
			res.redirect('/login')
		}else {
			req.session.isAuth = true
			req.session._id = result.data._id
			res.redirect('/')
		}
		
	}
}

module.exports = new AuthController()