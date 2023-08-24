const mongoose = require("mongoose");

const personnelShema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numeroTel: { type: String, required: true },
  numeroSecurite: { type: Number, required: true },
  adresse: { type: String, required: true },
  specialite: { type: String, required: true },
  sexe: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  dateEntre: { type: Date, required: false, default: "" },
  dateSortie: { type: Date, required: false, default: null },
  observation: { type: String, required: false, default: "" },
  photo: { type: String, required: false, default: "" },
});

module.exports = mongoose.model("Personnel", personnelShema);
