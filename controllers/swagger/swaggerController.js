const express = require("express")
const swaggerUI = require("swagger-ui-express")
const openApiSettings = require('../../config/docConfig/swaggerConfig')

const router = express.Router()

router.use("/", swaggerUI.serve, swaggerUI.setup(openApiSettings))

module.exports = router