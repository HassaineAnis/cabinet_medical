const express = require("express");

const router = express.Router();
const surveillanceControl = require("../controllers/surveillanceBebe");

router.post("/", surveillanceControl.ajouterSurveillanceBebe);
router.get("/", surveillanceControl.afficherSurveillanceBebe);
router.put("/:id", surveillanceControl.modifierSurveillanceBaby);
router.get("/:id", surveillanceControl.afficherSurveillanceBebeDetails);
router.post("/naissance", surveillanceControl.ajouterActeNaissance);
router.get("/naissance/tout", surveillanceControl.afficherNaissance);
router.get(
  "/naissance/details/:id",
  surveillanceControl.afficherNaissanceDetails
);
router.put("/naissance/:id", surveillanceControl.modifierNaissance);

module.exports = router;
