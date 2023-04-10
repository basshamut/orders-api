const express = require("express")
const {check, validationResult} = require("express-validator")
const loginService = require('../../services/login/loginService')
const jwtTool = require('../../utils/jwtTool')

const router = express.Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login de la aplicacion.
 *     description: Permite hacer el login de un propietario mediante el correo y el password, generando un token para la autenticacion al llamar los servicios.
 *     tags:
 *       - Login
 *     requestBody:
 *       description: Datos del propietario a loggear.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                   type: string
 *                   description: Correo electronico del propietario.
 *               password:
 *                   type: string
 *                   description: Password del propietario.
 *     responses:
 *       201:
 *         description: propietario logeado correctamente.
 *       400:
 *         description: Datos de entrada incorrectos.
 */

router.post('/', async (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    const isLogged = await loginService.login(request.body)
    if(isLogged){
        const email = request.body.email
        const token = jwtTool.generate(email)
        response.setHeader("token", token)
        return response.status(200).send({Message: "Login success!"})
    }

    return response.status(403).send({Message: "Login failed!"})
})

module.exports = router
