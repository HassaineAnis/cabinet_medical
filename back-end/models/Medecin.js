const mongoose = require("mongoose");

const medecinShema =mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
    specialite: { type: String, required: true },
 
 
})

module.exports = mongoose.model('Medecin',medecinShema);