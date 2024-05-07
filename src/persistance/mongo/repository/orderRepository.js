const orderEntity = require("../entities/order")
const mongoose = require('mongoose');

const orderRepository = {}

orderRepository.findAll = async function () {
    const values = await orderEntity.find({})
        .then((docs) => {
            const jsonDocs = docs.map(doc => doc.toJSON())
            return jsonDocs
        })
    return values
}

orderRepository.findById = async function (id) {
    const value = await orderEntity.findOne({"_id": id})
        .then((doc) => {
            return doc ? doc.toJSON() : undefined
        })
        .catch((error) => {
            console.error(error.message)
            return undefined
        })
    return value
}

orderRepository.findByOwnerId = async function (id) {
    const values = await orderEntity.find({"ownerId": id})
        .then((docs) => {
            const jsonDocs = docs.map(doc => doc.toJSON())
            return jsonDocs
        })
        .catch((error) => {
            console.error(error.message)
            return []
        })
    return values
}

orderRepository.findByClientId = async function (id) {
    const values = await orderEntity.find({"clientId": id})
        .then((docs) => {
            const jsonDocs = docs.map(doc => doc.toJSON())
            return jsonDocs
        })
        .catch((error) => {
            console.error(error.message)
            return []
        })
    return values
}

orderRepository.save = async function (order) {
    const ordersCollection = mongoose.connection.db.collection('orders')
    const value = await ordersCollection.insertOne(order)
    return orderRepository.findById(value.insertedId)
}

module.exports = orderRepository