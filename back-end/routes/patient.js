const express = require('express');

const router = express.Router();
const controlPatient = require("../controllers/patient");


router.get('/:id',controlPatient.afficherPatientMed);
router.post('/',controlPatient.ajouterPatient);
router.get('/details/:id',controlPatient.afficherUnPatient)
router.put('/:id',controlPatient.modifierPatient)
 



module.exports = router;