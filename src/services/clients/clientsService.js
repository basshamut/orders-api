const clients = require('../../persistance/memory/clientsMemoryRepository')

const clientsService = {}

clientsService.findAll = function (){
    return clients
}

clientsService.findById = function (id){
    return clients.find(clienteItem => clienteItem.id === id)
}

clientsService.save = function (client){
    client.id = clients.length + 1
    clients.push(client)

    return clients
}

clientsService.update = function (client){
    const clientById = clientsService.findById(client.id)

    if(!clientById){
        return undefined
    }

    clientById.name = client.name
    
    return clientById
}

clientsService.deleteById =function (id){
    return clients.filter(clienteItem => clienteItem.id !== parseInt(id))
}

module.exports = clientsService