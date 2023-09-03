const mongoose = require("mongoose");

const consultationShema = mongoose.Schema({
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
  status: { type: Boolean, required: false, default: false },
  diagnostic: { type: String, required: false, default: "" },
  symptome: { type: [String], required: false, default: [] },
  date: { type: Date, required: true },
  montant: { type: String, required: false, default: "2000" },
  informationsMedical: { type: Object, required: false, default: {} },
  fichierExterne: { type: [Object], required: false, default: [] },
  documentMedical: { type: [Object], required: false, default: [] },
});

module.exports = mongoose.model("Consultation", consultationShema);
