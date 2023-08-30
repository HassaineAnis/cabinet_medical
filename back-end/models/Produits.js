const mongoose = require("mongoose");

const produitShema = mongoose.Schema({
  denominationComerciale: { type: String, required: true },
  dci: { type: String, required: true },
  prix: { type: Number, required: true },
});
module.exports = mongoose.model("Produit", produitShema);
