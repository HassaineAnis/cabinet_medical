const mongoose = require("mongoose");

const consultationShema =mongoose.Schema({
 
nom : {type:String,required:true},
prenom : {type:String,required:true},
age : {type:Number,required:true },
diagnostic :{type:String,required:true},
date : {type:Date,required:true},
montant : {type:Number,required:true},
sexe : {type:String, required:true},

})

module.exports = mongoose.model('Consultation',consultationShema);