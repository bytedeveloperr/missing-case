require("dotenv").config()
const express = require("express")
const path = require("path")
const ejsMate = require("ejs-mate")
const cookieParser = require("cookie-parser")
const session = require("express-session")
var MongoDBStore = require('connect-mongodb-session')(session);
const flash = require("express-flash")
const methodOverride = require("method-override")
const database = require("./app/config/database")

const routes = require("./app/routes")

database()

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "./app/views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	store: new MongoDBStore({
	  uri: process.env.MONGO_URI,
	  collection: 'sessions'
	})
}))
app.use(flash())
app.use(methodOverride("_method"))

app.use('/public', express.static(path.join(__dirname, "./public")))
app.use('/uploads', express.static(path.join(__dirname, "./uploads")))
app.use(routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))