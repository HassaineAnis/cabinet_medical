const mongoose = require("mongoose");

const qntProduitShema = mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
  date: { type: Date, required: true },

  datePeremption: { type: Date, required: false, default: null },
  service: { type: String, required: false, default: null },

  typeOperation: { type: String, required: true },
  fournisseur: { type: String, required: false, default: null },
  quantite: { type: Number, required: true },
});
module.exports = mongoose.model("QntProduit", qntProduitShema);
