const express = require('express');
const multerPhoto = require('../middleware/multerConfig')

//const path = require('path')
//const dossierPhoto = path.join(__dirname,'..','photo');


const router = express.Router();
 
const medecinControl = require ('../controllers/medecin')

 
router.get('/:id',medecinControl.afficherUnMedecin);
router.get('/',medecinControl.afficherMedecin);
/*
router.post('/',multerPhoto,medecinControl.ajouterMedecin)
router.put('/:id',multerPhoto,medecinControl.modifierMedecin)
router.get('/',medecinControl.afficherMedecin);
router.delete('/:id', medecinControl.supprimerMedecin);
*/


module.exports = router