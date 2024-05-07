const bcrypt = require('bcrypt')

const encrypterTool = {}

encrypterTool.encode = async function (password) {
    const saltRounds = 5
    return await bcrypt.hash(password, saltRounds)
        .then((hash) => {
            return hash
        }).catch((err) => {
            return err
        })
}

encrypterTool.compare = async function (userPassword, hashedPassword) {
    return await bcrypt.compare(userPassword, hashedPassword)
        .then((result) => {
            if (result) {
                return true
            }
            return false
        }).catch((err) => {
            console.error(err)
            throw err
        })
}

module.exports = encrypterTool