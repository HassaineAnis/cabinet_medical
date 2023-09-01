const express = require("express");

const router = express.Router();
const surveillanceControl = require("../controllers/surveillance");

router.post("/", surveillanceControl.ajouterSurveillance);
router.get("/", surveillanceControl.afficherSurveillance);
router.get("/:id", surveillanceControl.afficherdetailSurveillance);
router.put("/:id", surveillanceControl.modifierSurveillance);

module.exports = router;
