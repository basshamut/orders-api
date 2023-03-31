const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Orders API',
            description: 'Orders API basic documentation',
            version: '1.0.0'
        },
        servers: [
            {
                url: "http://localhost:8080/",
            },
            {
                url: "https://orders-api-develop.up.railway.app/"
            }
        ],
        basePath: '/',
        components: {
            schemas: {}
        }
    },
    apis: ['controllers/*/*.js']
}

const openApiSettings = swaggerJsdoc(options)

module.exports = openApiSettings