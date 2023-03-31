const swaggerJsdoc = require("swagger-jsdoc")

/**
 * Opciones
 */
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
        ],
        basePath: '/',
        components: {
            schemas: {
                client: {
                    type: 'object',
                    require: [""],
                    properties: {
                        id: {
                            type: "integer"
                        },
                        name: {
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    apis: ['controllers/*/*.js']
}

const openApiSettings = swaggerJsdoc(options)

module.exports = openApiSettings