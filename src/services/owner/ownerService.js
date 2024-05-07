const uuid = require('uuid')
const nodemailer = require('nodemailer')

const ownerRepository = require('../../persistance/mongo/repository/ownerRepository')
const encrypterTool = require('../../utils/encrypterTool')

const ownerService = {}

ownerService.findAll = async function () {
    const list = await ownerRepository.findAll()
    for (const owner of list) {
        delete owner.encryptedPassword
    }

    return list
}

ownerService.findById = async function (id) {
    const owner = await ownerRepository.findById(id)
    delete owner.encryptedPassword
    return owner
}

ownerService.findByEmail = function (email) {
    return ownerRepository.findByEmail(email)
}

async function sendPasswordByEmail(passwordGenerated) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'wtysoftware@proton.me',
        to: 'wtysoftware@proton.me',
        subject: 'Correo de prueba',
        text: `Password generado: ${passwordGenerated}`
    };

    return await transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Correo enviado: ' + info.response);
            return true
        })
        .catch(error => {
            console.log(error);
            return false
        });
}

ownerService.save = async function (owner) {
    const ownerSearched = await ownerService.findByEmail(owner.email)

    if(ownerSearched){
        return undefined
    }

    const passwordGenerated = uuid.v4()
    const passwordSendedStatus = await sendPasswordByEmail(passwordGenerated)
    console.log(passwordGenerated)

    if(passwordSendedStatus){
        owner.encryptedPassword = await encrypterTool.encode(passwordGenerated)
        const ownerSaved = await ownerRepository.save(owner)
        delete ownerSaved.encryptedPassword

        return ownerSaved
    }

    return undefined
}

module.exports = ownerService