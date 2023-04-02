const express = require("express")
const { check, validationResult } = require("express-validator")
const orderService = require('../../services/order/orderService')

const router = express.Router()

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     description: Retorna una lista de todos los pedidos
 *     produces:
 *       - application/json
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const ordersInStringFormat = await orderService.findAll()
    const ordersInJson = JSON.stringify(ordersInStringFormat)
    response.status(200).send(ordersInJson)
})

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Obtiene los datos de un pedido
 *     description: Retorna un pedido en particular usando su id
 *     parameters:
 *       - name: id
 *         description: ID del pedido.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: No encontrado
 */
router.get("/:id", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const order = await orderService.findById(request.params.id)

   if(order){
        const orderParsed = JSON.stringify(order)
        return response.status(200).send(orderParsed)
    }

    return response.status(404).send(JSON.stringify(
            {
                "Message": "Not found"
            }
        ))
})

/**
 * @openapi
 * /api/orders/clients/{id}:
 *   get:
 *     summary: Obtiene los pedido por cliente
 *     description: Retorna una lista de pedidos filtrada por cliente
 *     parameters:
 *       - name: id
 *         description: ID del cliente.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Nok
 */
router.get("/clients/:id", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const ordersInStringFormat = await orderService.findByClientId(request.params.id)
    const ordersInJson = JSON.stringify(ordersInStringFormat)
    response.status(200).send(ordersInJson)
})

/**
 * @openapi
 * /api/orders/owners/{id}:
 *   get:
 *     summary: Obtiene los pedido por propietiario
 *     description: Retorna una lista de pedidos filtrada por propietario
 *     parameters:
 *       - name: id
 *         description: ID del propietario.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Nok
 */
router.get("/owners/:id", async function(request, response){
    response.setHeader('Content-Type', 'application/json')
    const ordersInStringFormat = await orderService.findByOwnerId(request.params.id)
    const ordersInJson = JSON.stringify(ordersInStringFormat)
    response.status(200).send(ordersInJson)
})

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Crea un pedido.
 *     description: Crea un pedido con los datos enviados en el cuerpo de la solicitud.
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: Datos del usuario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *                 description: ID del propietario.
 *               clientId:
 *                 type: string
 *                 description: ID del cliente.
 *               containsBasket:
 *                 type: boolean
 *                 description: Define si el pedido tiene cesta o no.
 *               observations:
 *                  type: string
 *                  description: Contiene las observaciones sobre el pedido.
 *               items:
 *                 type: array
 *                 description: Lista items del pedido.
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID del producto.
 *                     quantity:
 *                       type: number
 *                       description: Cantidad de productos a solicitar.
 *     responses:
 *       201:
 *         description: Pedido creado correctamente.
 *       400:
 *         description: Datos de entrada incorrectos.
 */
router.post('/', async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const order = await orderService.save(request.body)
    response.status(201).send(order)
})

// router.put('/:id', [
//     check('name').isLength({min: 3})
// ], (request, response) => {
//     response.setHeader('Content-Type', 'application/json')
//
//     const errors = validationResult(request)
//     if(!errors.isEmpty()){
//         return response.status(404).send(JSON.stringify(
//             {
//                 "errors": errors.array()
//             }
//         ))
//     }
//
//     const client = clientsService.findById(parseInt(request.params.id))
//     if(!client){
//         return response.status(404).send(JSON.stringify(
//             {
//                 "Message": "Not found"
//             }
//         ))
//     }
//
//     client.name = request.body.name
//
//     response.status(200).send(clientsService.update(client))
// })
//
// router.delete("/:id", function(request, response){
//     response.setHeader('Content-Type', 'application/json')
//     const client = clientsService.deleteById(parseInt(request.params.id))
//
//     if(client){
//         clients = clients.filter(clienteItem => clienteItem.id !== parseInt(request.params.id))
//         return responseresponse.status(200).send(JSON.stringify(cliente))
//     }
//
//     return response.status(404).send(JSON.stringify(
//             {
//                 "Message": "Not found"
//             }
//         ))
//
// })

module.exports = router