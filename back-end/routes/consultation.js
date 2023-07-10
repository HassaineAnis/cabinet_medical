const express = require('express');

const router = express.Router();
const consultControl = require ('../controllers/consultation');
 


router.post('/',consultControl.ajoutConsultation);
router.get('/',consultControl.afficherConsultation);
router.delete('/:id',consultControl.supprimerConsultation)

 module.exports = router;
