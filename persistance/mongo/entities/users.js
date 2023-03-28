const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    ownerId: String,
    name: String,
    email: String,
    role:{
        type: ['ROOT', 'USER', 'CLIENT', 'DISPATCHER']
    }
})

const userDocument = new mongoose.model("users", userSchema)

module.exports = userDocument