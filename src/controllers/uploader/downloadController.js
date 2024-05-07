const express = require("express")
const downloaderService = require('../../services/uploader/downloaderService')
const path = require("path");
const router = express.Router()

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    const filePath = path.join("", 'uploads-folder/', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.log(`Error al descargar el archivo: ${err}`);
            res.status(500).send('Error al descargar el archivo');
        }

        res.status(200).send('File download successfully.')
    })

})

module.exports = router;
