const express = require("express");

const router = express.Router();
const qntProduitControl = require("../controllers/qntProduit");

router.post("/ajouter", qntProduitControl.ajouterQuantite);
router.post("/retirer", qntProduitControl.retirerQuantite);
router.get("/:id", qntProduitControl.afficherQuantite);

module.exports = router;
