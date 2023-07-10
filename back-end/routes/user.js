const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const multerPhoto = require('../middleware/multerConfig');
 


//router pour recuperer la liste des role  
router.get('/:role',userController.afficherUsers);
router.post('/login',userController.login)
router.post('/signUp',multerPhoto,userController.signUp)
router.delete('/:id',userController.removeUser);
router.get('/profile/:id',userController.afficherUnUser)
router.put('/:id',multerPhoto,userController.modifierUser)

module.exports = router