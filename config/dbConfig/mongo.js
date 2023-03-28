const mongoose = require("mongoose")

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

module.exports = dbConnect