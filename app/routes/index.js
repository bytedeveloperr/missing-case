const router = require("express").Router()
const cases = require("./cases")
const { renderRegister, postRegister, renderLogin, postLogin } = require("../controllers/AuthController")
const { singleUser, updateUser } = require("../controllers/UserController")
const isGuest = require("../middleware/isGuest")
const isAuth = require("../middleware/isAuth")

router.get('/', (req, res) => {
	res.redirect("/case/browse")
})

/* GET /login - render login page */
router.get('/login', isGuest, renderLogin)
/* GET /register - render register page */
router.get('/register', isGuest, renderRegister)
router.get("/profile", isAuth, singleUser)
router.put("/profile", isAuth, updateUser)
/* POST /register - register user */
router.post('/register', isGuest, postRegister)
/*POST /login - login user */
router.post('/login', isGuest, postLogin)
router.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect("/login")
})
router.use('/case', cases)
module.exports = router