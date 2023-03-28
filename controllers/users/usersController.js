const express = require("express")
const { check, validationResult } = require("express-validator")
const usersService = require('../../services/users/usersService')

const router = express.Router()

router.get("/", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    response.status(200).send(JSON.stringify( await usersService.findAll()))
})

module.exports = router