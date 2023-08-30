const mongoose = require("mongoose");

const navetteShema = mongoose.Schema({
  dateSortie: { type: Date, required: true },
  dateEntre: { type: Date, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: String, required: true },
  diagnostic: { type: String, required: true },
  documentData: { type: [Object], required: false, default: [] },
});

module.exports = mongoose.model("Navette", navetteShema);
