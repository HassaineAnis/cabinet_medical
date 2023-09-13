const express = require("express");

const router = express.Router();
const conventionControl = require("../controllers/convention");

router.post("/", conventionControl.ajouterConvention);
router.get("/", conventionControl.afficherConvention);
router.post("/prestation", conventionControl.ajouterPrestation);
router.get("/prestation/:id", conventionControl.afficherPrestation);

module.exports = router;
