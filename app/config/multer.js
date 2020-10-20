const multer  = require('multer')
const path = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

var upload = multer({ storage: storage })
// const upload = multer({ dest: path.join(__dirname, 'uploads/') })

module.exports = upload