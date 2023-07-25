const mongoose = require("mongoose");
 

const patientShema = mongoose.Schema({
    medecin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numeroTel: { type: String, required: true },
  age :{type:Number,required:true},
  adresse: { type: String, required: true },
  
  sexe: { type: String, required: true },
 
});
 
 

module.exports = mongoose.model("Patient", patientShema);
