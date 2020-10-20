module.exports = (req, res, next) => {
	if(req.session.isAuth) {
		next()
	}else{
		req.flash('error', 'You must be logged in to continue')
		res.redirect('/login')
	}
}