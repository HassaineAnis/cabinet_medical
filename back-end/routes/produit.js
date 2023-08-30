const express = require("express");

const router = express.Router();
const produitControl = require("../controllers/produit");

router.post("/", produitControl.ajouterProduit);
router.get("/", produitControl.afficherProduit);
router.put("/:id", produitControl.modifierProduit);
router.get("/:id", produitControl.afficherDetailProduit);

module.exports = router;
