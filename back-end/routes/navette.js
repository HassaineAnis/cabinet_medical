const express = require("express");

const router = express.Router();
const navetteControl = require("../controllers/navette");

router.post("/", navetteControl.ajouterNavette);
router.get("/", navetteControl.afficherNavette);
router.put("/:id", navetteControl.modifierNavette);
router.get("/:id", navetteControl.afficherdetailNavette);

module.exports = router;
