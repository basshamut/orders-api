const express = require("express")
const { check, validationResult } = require("express-validator")
const clientsService = require('../../services/clients/clientsService')

const router = express.Router()

router.get("/", function(request, response){
    response.setHeader('Content-Type', 'application/json')    
    response.status(200).send(JSON.stringify(clientsService.findAll()))
})

router.get("/:id", function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const cliente = clientsService.findById(parseInt(request.params.id))

    if(cliente){
        return response.status(200).send(JSON.stringify(cliente))
    }
    
    return response.status(404).send(JSON.stringify(
            {
                "Message": "Not found"
            }
        ))
    
})

router.post('/', (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const client = {
        name: request.body.name
    }

    clientsService.save(client)

    response.status(201).send(client)
})

router.put('/:id', [
    check('name').isLength({min: 3})
], (request, response) => {
    response.setHeader('Content-Type', 'application/json')

    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(404).send(JSON.stringify(
            {
                "errors": errors.array()
            }
        ))
    }

    const client = clientsService.findById(parseInt(request.params.id))
    if(!client){
        return response.status(404).send(JSON.stringify(
            {
                "Message": "Not found"
            }
        ))
    }

    client.name = request.body.name

    response.status(200).send(clientsService.update(client))
})

router.delete("/:id", function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const client = clientsService.deleteById(parseInt(request.params.id))

    if(client){
        clients = clients.filter(clienteItem => clienteItem.id !== parseInt(request.params.id))
        return responseresponse.status(200).send(JSON.stringify(cliente))
    }
    
    return response.status(404).send(JSON.stringify(
            {
                "Message": "Not found"
            }
        ))
    
})

module.exports = router