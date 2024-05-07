const userEntity = require("../entities/user")

const userRepository = {}

userRepository.findAll = async function () {
    const values = await  userEntity.find({}).then((docs) => {
        const jsonDocs = docs.map(doc => doc.toJSON())
        return jsonDocs
    })
    return values
}

module.exports = userRepository