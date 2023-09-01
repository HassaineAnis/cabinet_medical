const express = require("express");

const router = express.Router();
const surveillanceControl = require("../controllers/surveillanceBebe");

router.post("/", surveillanceControl.ajouterSurveillanceBebe);
router.get("/", surveillanceControl.afficherSurveillanceBebe);
router.put("/:id", surveillanceControl.modifierSurveillanceBaby);
router.get("/:id", surveillanceControl.afficherSurveillanceBebeDetails);

module.exports = router;
