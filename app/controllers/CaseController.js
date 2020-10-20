const CaseService = require("../services/CaseService")

class CaseController {

	async renderReportCaseForm(req, res) {
		res.render("report-case", { title: "Report A Case" })
	}

	async reportCase(req, res) {
		req.body.image =  `/uploads/${req.file.filename}`
		req.body.reporter = req.session._id
		let result = await CaseService.create(req.body)
		if(!result.success) {
			req.flash('error', result.text)
			res.redirect('/case/report')
		}else {
			res.redirect(`/case/${result.data._id}`)
		}
	}

	async browseCases(req, res) {
		let result = await CaseService.getCases()
		res.render("browse-cases", { title: "Browse cases", data: result.data })
	}
	
	async singleCase(req, res) {
		let result = await CaseService.getSingleCase(req.params.id)
		res.render("single-case", { title: "Browse cases", data: result.data })
		// res.json(result)
	}
}

module.exports = new CaseController()