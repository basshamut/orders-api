const orderRepository = require('../../persistance/mongo/repository/orderRepository')
const productRepository = require('../../persistance/mongo/repository/productRepository')

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
    const productsThatNotExist = []

    for (const item of order.items) {
        const itemSearched = await productRepository.findById(item.productId)
        if(!itemSearched){
            productsThatNotExist.push(item)
        }
    }

    const orderResponse = {}

    if(productsThatNotExist.length === 0){
        orderResponse.orderInfo = await orderRepository.save(order)
        orderResponse.itemsNotFound = []
        return orderResponse
    }


    orderResponse.orderInfo = order
    orderResponse.itemsNotFound = productsThatNotExist

    return orderResponse
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