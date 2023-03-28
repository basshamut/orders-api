require("dotenv").config()
const express = require("express")
const morgan = require("morgan")

const dbConnect = require("./config/dbConfig/mongo")

const clientsController = require('./controllers/clients/clientsController')
const uploaderController = require('./controllers/uploader/uploaderController')
const swaggerController = require('./controllers/swagger/swaggerController')
const usersController = require('./controllers/users/usersController')

const app = express()
const port = process.env.PORT || 8080

dbConnect()

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/clients', clientsController)
app.use('/api/upload', uploaderController)
app.use('/api/swagger', swaggerController)
app.use('/api/users', usersController)

app.get('/', (request, response) => {    
    response.status(200).json({
        Message: "Service is up!"
    })
})

app.listen(port, console.log("Listening in port " + port))