const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    quantity: String
}, { _id: false, id: false })

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    ownerId: mongoose.Types.ObjectId,
    clientId: mongoose.Types.ObjectId,
    containsBasket: {
        type: Boolean,
        default: true
    },
    observations: String,
    createAt :{
        type: Date,
        default: Date.now()
    },
    items: [itemSchema]
}, {versionKey: false})

const orderDocument = new mongoose.model("orders", orderSchema)

module.exports = orderDocument