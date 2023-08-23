const mongoose = require("mongoose");

const analyseShema = mongoose.Schema({
  laborantin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: { type: Date, required: true },
  service: { type: String, required: true },
  typeAnalyse: { type: String, required: true },
  document: { type: Object, required: false, default: {} },
});

module.exports = mongoose.model("Analyse", analyseShema);
