const express = require("express");

const router = express.Router();
const RdvControl = require("../controllers/rendezVous");

router.post("/", RdvControl.ajouterRendezVous);
router.get("/archive", RdvControl.afficherRendezVousArchiver);
router.get("/", RdvControl.afficherRendezVous);
router.get("/detail/:id", RdvControl.afficherUnRendezVous);
router.get("/:id", RdvControl.afficherRendezVousMedecin);
router.delete("/:id", RdvControl.supprimerRendezVous);
router.put("/:id", RdvControl.modifierRendezVous);
router.put("/confirmer/:id", RdvControl.confirmeRendezVous);
router.get("/patient/:id", RdvControl.afficherRendezVousPatient);
router.put("/date/:id", RdvControl.modifierDateRdv);

module.exports = router;
