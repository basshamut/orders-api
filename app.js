require('dotenv').config();
require("./config/dbConfig/mongo").connect()

const express = require("express")
const morgan = require("morgan")

const clientsController = require('./controllers/client/clientController')
const uploaderController = require('./controllers/uploader/uploaderController')
const swaggerController = require('./controllers/swagger/swaggerController')
const usersController = require('./controllers/user/userController')
const orderController = require('./controllers/order/orderController')

const app = express()
const port = process.env.PORT

app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/client', clientsController)
app.use('/api/upload', uploaderController)
app.use('/api/swagger', swaggerController)
app.use('/api/users', usersController)
app.use('/api/orders', orderController)

app.get('/', (request, response) => {
    response.status(200).json({
        Message: "Service is up!"
    })
})

app.listen(port, console.log("Listening in port " + port))