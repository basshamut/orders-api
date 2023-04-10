const express = require("express")
const {check, validationResult} = require("express-validator")
const ownerService = require('../../services/owner/ownerService')

const router = express.Router()

/**
 * @openapi
 * /api/owners:
 *   get:
 *     summary: Obtiene todos propietarios de cuenta
 *     description: Retorna una lista de todos los propietarios
 *     produces:
 *       - application/json
 *     tags:
 *       - Owners
 *     responses:
 *       200:
 *         description: Lista de propietarios
 */
router.get("/", async function (request, response) {
    response.setHeader('Content-Type', 'application/json')
    const ownersInStringFormat = await ownerService.findAll()
    const ownersInJson = JSON.stringify(ownersInStringFormat)
    response.status(200).send(ownersInJson)
})

/**
 * @openapi
 * /api/owners/{id}:
 *   get:
 *     summary: Obtiene los datos de un propietario
 *     description: Retorna un propietario en particular usando su id
 *     parameters:
 *       - name: id
 *         description: ID del propietario.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     tags:
 *       - Owners
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: No encontrado
 */
router.get("/:id", async function (request, response) {
    response.setHeader('Content-Type', 'application/json')
    const owner = await ownerService.findById(request.params.id)

    if (owner) {
        const ownerParsed = JSON.stringify(owner)
        return response.status(200).send(ownerParsed)
    }

    return response.status(404).send(JSON.stringify(
        {
            Message: "Not found"
        }
    ))
})

/**
 * @openapi
 * /api/owners:
 *   post:
 *     summary: Crea un propietario.
 *     description: Crea un propietario con los datos enviados en el cuerpo de la solicitud.
 *     tags:
 *       - Owners
 *     requestBody:
 *       description: Datos del usuario a crear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               socialRazon:
 *                  type: string
 *                  description: Razon social del propietario.
 *               name:
 *                   type: string
 *                   description: Nombre del propietario.
 *               email:
 *                   type: string
 *                   description: Correo electronico del propietario.
 *               address:
 *                   type: string
 *                   description: Contiene las observaciones sobre el propietario.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: propietario creado correctamente.
 *       400:
 *         description: Datos de entrada incorrectos.
 */
router.post('/', async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const owner = await ownerService.save(request.body)

    if(owner){
        return response.status(201).send(owner)
    }

    response.status(409).send({Message: "Error 409: Error when create resource"})
})

module.exports = router