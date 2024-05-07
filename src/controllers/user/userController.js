const express = require("express")
const usersService = require('../../services/users/usersService')

const router = express.Router()

router.get("/", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const users = await usersService.findAll()
    const usersList = JSON.stringify(users)
    response.status(200).send(usersList)
})

module.exports = router