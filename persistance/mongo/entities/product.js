const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    ownerId: String,
    name: String,
    quantity: Number
})

const productDocument = new mongoose.model("products", productSchema)

module.exports = productDocument