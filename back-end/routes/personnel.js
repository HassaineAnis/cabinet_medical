const express = require('express');
const multerPhoto = require('../middleware/multerConfig')

const router = express.Router();

const personnelControl = require("../controllers/personnel")


router.get('/:id',personnelControl.afficherUnPersonnel );
router.post('/',multerPhoto,personnelControl.ajouterPersonnel)
router.put('/:id',multerPhoto,personnelControl.modifierPersonnel )
router.get('/',personnelControl.afficherPersonnel);
router.delete('/:id', personnelControl.supprimerPersonnel);


module.exports = router