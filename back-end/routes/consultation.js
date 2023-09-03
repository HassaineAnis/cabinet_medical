const express = require("express");

const router = express.Router();
const consultControl = require("../controllers/consultation");
const multerFile = require("../middleware/multerdocumentConfig");

router.post("/", multerFile, consultControl.ajoutConsultation);
router.get("/", consultControl.afficherConsultation);
router.delete("/:id", consultControl.supprimerConsultation);
router.get("/patient/:id", consultControl.afficherConsultationPatient);
router.get("/patient/detail/:id", consultControl.afficherDetailConsultation);

module.exports = router;
