const productEntity = require("../entities/product")

const productRepository = {}

productRepository.findAll = async function () {
    const values = await  productEntity.find({}).then((docs) => {
        const jsonDocs = docs.map(doc => doc.toJSON())
        return jsonDocs
    })
    return values
}

productRepository.findById = async function (id) {
    const value = await productEntity.findOne({"_id": id})
        .then((doc) => {
            return doc ? doc.toJSON() : undefined
        })
        .catch((error) => {
            console.error(error.message)
            return undefined
        })
    return value
}

module.exports = productRepository