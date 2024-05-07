const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET_KEY
const jwtTool = {}

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                reject(error)
            } else {
                resolve(decoded)
            }
        })
    })
}

jwtTool.generate = function (email) {
    return jwt.sign({email}, secretKey, {expiresIn: process.env.JWT_EXPIRATION_TIME})//TODO ajustar, esta a 8hrs
}

jwtTool.verify = async function (token) {
    if (token == null){
        return false
    }

    return await verifyToken(token, secretKey)
        .then(decoded => {
            console.log(decoded)
            return true
        })
        .catch(error => {
            console.log(error)
            return false
        })
}

module.exports = jwtTool