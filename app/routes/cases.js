const router = require("express").Router()
const isAuth = require("../middleware/isAuth")
const { renderReportCaseForm, reportCase, browseCases, singleCase } = require("../controllers/CaseController")
const upload = require("../config/multer")

/* GET /case/browse - browse cases page */
router.get('/browse', browseCases)

/* GET /case/report - report case page */
router.get('/report', isAuth, renderReportCaseForm)

/* GET /case/:id - single report page */
router.get('/:id', singleCase)

/* POST /case - create new case */
router.post('/report', isAuth, upload.single('image'), reportCase)

/* GET /case/:id/edit - edit case page */
router.get('/:id/edit', (req, res) => {
	res.send("edit")
})

/* PUT /case/:id - update case */
router.put('/:id', (req, res) => {
	res.send("update")
})

module.exports = router