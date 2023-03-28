const userRepository = require("../../persistance/mongo/repository/usersRepository")

const userService = {}

userService.findAll = async function (){
    return await userRepository.findAll()
}

module.exports = userService