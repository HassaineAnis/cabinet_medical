const mongoose = require("mongoose");

const acteNaissanceShema = mongoose.Schema({
  numero: { type: String, required: true },
  grosseLettre: { type: String, required: true },
  dateMariage: { type: Date, required: true },
  lfNumero: { type: String, required: true },

  du: { type: String, required: true },
  numeroActe: { type: String, required: true },
  deuxMille: { type: String, required: true },
  heure: { type: String, required: true },
  jour: { type: String, required: true },
  mois: { type: String, required: true },
  minute: { type: String, required: true },
  dame: { type: String, required: true },
  ageDame: { type: String, required: true },
  dateDame: { type: Date, required: true },
  lieuDame: { type: String, required: true },
  professionDame: { type: String, required: true },
  epou: { type: String, required: true },
  ageEpou: { type: String, required: true },
  dateEpou: { type: Date, required: true },
  lieuEpou: { type: String, required: true },
  professionEpou: { type: String, required: true },
  domicile: { type: String, required: true },
  sexeEnfant: { type: String, required: true },
  prenomEnfant: { type: String, required: true },
});

module.exports = mongoose.model("ActeNaissance", acteNaissanceShema);
