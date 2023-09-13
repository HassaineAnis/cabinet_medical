const mongoose = require("mongoose");

const conventionShema = mongoose.Schema({
  convention: { type: String, required: true },
});

module.exports = mongoose.model("Convention", conventionShema);
