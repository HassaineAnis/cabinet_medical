const express = require("express");

const router = express.Router();
const interventionControl = require("../controllers/intervention");

router.post("/", interventionControl.ajouterIntervention);
router.get("/patient/:id", interventionControl.afficherInterventionPatient);
router.get(
  "/patient/details/:id",
  interventionControl.afficherDetailIntervention
);
router.put("/:id", interventionControl.modifierIntervention);

module.exports = router;
