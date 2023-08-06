const mongoose = require("mongoose");

const magasinShema = mongoose.Schema({
  quantite: { type: Number, required: true, default: 0 },
  nom: { type: String, required: true },
  photo: { type: String, required: false, default: "" },

  service: {
    type: [Object],
    required: false,
    default: [
      { nom: "bloc opératoire", qntRequis: 0, qntActuel: 0 },
      { nom: "Service hospitalisation", qntRequis: 0, qntActuel: 0 },
      { nom: "Hopital du jour", qntRequis: 0, qntActuel: 0 },
      { nom: "chambre médecin", qntRequis: 0, qntActuel: 0 },
    ],
  },
});

module.exports = mongoose.model("Magasin", magasinShema);
