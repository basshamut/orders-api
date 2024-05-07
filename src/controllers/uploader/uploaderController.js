const express = require("express")
const uploaderService = require('../../services/uploader/uploaderService')
const router = express.Router()

router.post('/', uploaderService.upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }
    res.status(200).send('File uploaded successfully.')
  })

module.exports = router;  
  