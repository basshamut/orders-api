const encrypterTool = require('../../utils/encrypterTool')
const ownerService = require('../owner/ownerService')

const loginService = {}

loginService.login = async function (loginOwner){
    const owner = await ownerService.findByEmail(loginOwner.email);
    if(owner){
        return await encrypterTool.compare(loginOwner.password, owner.encryptedPassword)
    }
    return false
}

module.exports = loginService