const mongoose = require("mongoose");

const surveillanceShema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: String, required: true },
  diagnostic: { type: String, required: true },
  date: { type: Date, required: true },
  chirurgien: { type: String, required: true },
  reanimateur: { type: String, required: true },
  groupage: { type: String, required: true },
  heure: { type: String, required: true },
  intervention: { type: String, required: true },
  purfusions: { type: Object, required: false, default: {} },

  documentData: { type: [Object], required: false, default: [] },
});

module.exports = mongoose.model("Surveillance", surveillanceShema);
