const orderRepository = require('../../persistance/mongo/repository/orderRepository')

const orderService = {}

orderService.findAll = function (){
    return orderRepository.findAll()
}

orderService.findById = function (id){
    return orderRepository.findById(id)
}

orderService.findByClientId = function (id){
    return orderRepository.findByClientId(id)
}

orderService.findByOwnerId = function (id){
    return orderRepository.findByOwnerId(id)
}
orderService.save = async function (order){
    const orderSearched = await orderRepository.findById(order._id)
    if(!orderSearched){
        const orderSaved = orderRepository.save(order)
        console.log(orderSaved)
        return orderSaved
    }
    return orderSearched
}

// orderService.update = function (client){
//     const clientById = orderService.findById(client.id)
//
//     if(!clientById){
//         return undefined
//     }
//
//     clientById.name = client.name
//
//     return clientById
// }
//
// orderService.deleteById =function (id){
//     return clients.filter(clienteItem => clienteItem.id !== parseInt(id))
// }

module.exports = orderService