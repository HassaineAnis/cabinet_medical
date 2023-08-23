const express = require("express");

const router = express.Router();
const analyseControl = require("../controllers/analyseM");

router.post("/", analyseControl.ajouterAnalyse);
router.get("/patient/:id", analyseControl.afficherAnalysePatient);
router.get("/details/:id", analyseControl.afficherUneAnalyse);
router.put("/:id", analyseControl.modifierAnalyse);

module.exports = router;
