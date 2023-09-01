const mongoose = require("mongoose");

const surveillanceBebeShema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  sexe: { type: String, required: true },
  couveuse: { type: String, required: true },
  date: { type: Date, required: true },
  nne: { type: String, required: true },
  antiD: { type: String, required: true },
  groupage: { type: String, required: true },
  heure: { type: String, required: true },
  accouchement: { type: String, required: true },

  documentData: { type: [Object], required: false, default: [] },
});

module.exports = mongoose.model("SurveillanceBebe", surveillanceBebeShema);
