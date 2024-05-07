const mongoose = require("mongoose")

const mongoConnection = {}
const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.info("*** Connection sucessful ***")
        })
        .catch(() => {
            console.error("*** Connection failure ***")
        })
}

mongoConnection.connect = dbConnect

module.exports = mongoConnection