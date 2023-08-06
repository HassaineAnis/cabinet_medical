const express = require("express");
const router = express.Router();
const magasinControl = require("../controllers/magasin");
const multerPhoto = require("../middleware/multerConfig");

router.get("/", magasinControl.afficherProduit);
router.post("/", multerPhoto, magasinControl.ajouterProduit);
router.put("/service/:id", multerPhoto, magasinControl.modifierQntService);
router.get("/:id", magasinControl.afficherUnProduit);
router.delete("/:id", magasinControl.supprimerProduit);

module.exports = router;
