const mongoose = require("mongoose");

const prestationShema = mongoose.Schema({
  convention: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Convention",
    required: true,
  },
  typeIntervention: { type: String, required: true },
  prix: { type: Number, required: true },
  prixConvention: { type: Number, required: true },
});

module.exports = mongoose.model("Prestation", prestationShema);
