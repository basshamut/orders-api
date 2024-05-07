const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    socialRazon: String,
    name: String,
    email: String,
    address: String,
    encryptedPassword: String,
    createAt :{
        type: Date,
        default: Date.now()
    }
}, {versionKey: false})

const ownerDocument = new mongoose.model("owners", ownerSchema)

module.exports = ownerDocument

