require('dotenv').config();
require("./src/config/dbConfig/mongo").connect()

const express = require("express")
const morgan = require("morgan")
const cors = require('cors');

const clientsController = require('./src/controllers/client/clientController')
const uploaderController = require('./src/controllers/uploader/uploaderController')
const downloadController = require('./src/controllers/uploader/downloadController')
const swaggerController = require('./src/controllers/swagger/swaggerController')
const usersController = require('./src/controllers/user/userController')
const orderController = require('./src/controllers/order/orderController')
const ownerController = require('./src/controllers/owner/ownerController')
const loginController = require('./src/controllers/login/loginController')

const app = express()
const port = process.env.PORT
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan('tiny'))
app.use(express.json())

app.use('/api/login', loginController)
app.use('/api/clients', clientsController)
app.use('/api/uploads', uploaderController)
app.use('/api/downloads', downloadController)
app.use('/api/swagger', swaggerController)
app.use('/api/users', usersController)
app.use('/api/orders', orderController)
app.use('/api/owners', ownerController)

app.get('/', (request, response) => {
    response.status(200).json({
        Message: "Service is up!"
    })
})

app.listen(port, function(){
    console.log("Listening in port " + port)
})