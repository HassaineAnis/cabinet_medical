const express = require('express');

const router = express.Router();
const congeControl = require ('../controllers/conge');
 
 


router.post('/' ,congeControl.ajoutConge);
router.get('/user',congeControl.afficherCongeUsers);
router.get('/personnel',congeControl.afficherCongePersonnel);
 
router.delete('/:id',congeControl.supprimerConge)
router.put('/archiver/:id',congeControl.archiverConge)
router.put('/:id',congeControl.modifierConge)
 
 
 module.exports = router;
