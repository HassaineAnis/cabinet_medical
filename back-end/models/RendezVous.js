const mongoose = require("mongoose");

const rendezVousShema = mongoose.Schema({
  medecin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,

  },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number, required: true },
  sexe: { type: String, required: true },
  motif: { type: String, required: true },
  date: { type: Date, required: true },
  adresse:{type:String,required:true},
  numeroTel:{type :String ,required:true},
  typeAccouchement:{type:String, required:false,default:""},
  typeCherurgie:{type:String,required:false,default:""},
  status :{type:Boolean, required:false,default:false},
 
  
});

module.exports = mongoose.model("RendezVous", rendezVousShema);
