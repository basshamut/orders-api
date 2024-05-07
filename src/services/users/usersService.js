const userRepository = require("../../persistance/mongo/repository/userRepository")

const userService = {}

userService.findAll = async function (){
    return await userRepository.findAll()
}

module.exports = userService