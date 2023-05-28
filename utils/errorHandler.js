const jwtTool = require('./jwtTool')

const errorHandler = {}

errorHandler.jwtHandler = async function (request, response){
    const authorizationToken = request.get("Authorization")
    if(!authorizationToken){
        return response.status(403).send({Message: "Error 403: Unauthorized"})
    }

    const authorizationStatus = await jwtTool.verify(authorizationToken.replace("Bearer ", ""))

    if(!authorizationStatus){
        return response.status(403).send({Message: "Error 403: Unauthorized"})
    }

    return undefined
}

module.exports = errorHandler