const ownerEntity = require("../entities/owner")
const mongoose = require('mongoose');

const ownerRepository = {}

ownerRepository.findAll = async function () {
    const values = await ownerEntity.find({})
        .then((docs) => {
            const jsonDocs = docs.map(doc => doc.toJSON())
            return jsonDocs
        })
    return values
}

ownerRepository.findById = async function (id) {
    const value = await ownerEntity.findOne({"_id": id})
        .then((doc) => {
            return doc ? doc.toJSON() : undefined
        })
        .catch((error) => {
            console.error(error.message)
            return undefined
        })
    return value
}

ownerRepository.findByEmail = async function (email) {
    const value = await ownerEntity.findOne({"email": email})
        .then((doc) => {
            return doc ? doc.toJSON() : undefined
        })
        .catch((error) => {
            console.error(error.message)
            return undefined
        })
    return value
}

ownerRepository.save = async function (owner) {
    const ownersCollection = mongoose.connection.db.collection('owners')
    const value = await ownersCollection.insertOne(owner)
    return ownerRepository.findById(value.insertedId)
}

module.exports = ownerRepository