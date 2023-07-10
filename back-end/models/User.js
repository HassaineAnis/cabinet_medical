const mongoose = require("mongoose");
 

const userShema = mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numeroTel: { type: String, required: true },
  numeroSecurite: { type: Number, required: true },
  adresse: { type: String, required: true },
  
  sexe: { type: String, required: true },
  dateNaissance: { type: Date, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: false, default: "" },
  role: { type: String, required: true },
});
 
 

module.exports = mongoose.model("User", userShema);
