const mongoose = require("mongoose");

const interventionShema = mongoose.Schema({
  medecin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  diagnosticLesionnel: { type: String, required: true },
  protocole: { type: String, required: false },
  date: { type: Date, required: true },
  aide: { type: String, required: true },
  bloc: { type: String, required: true },
  anesthesiste: { type: String, required: true },
  interventionPratique: { type: String, required: true },
  observation: { type: String, required: true },
  pr: { type: String, required: true },
  typeIntervention: { type: String, required: true },
});

module.exports = mongoose.model("Intervention", interventionShema);
