const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads-folder/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploaderService = {}
uploaderService.upload = multer({ storage: storage })
module.exports = uploaderService