const mongoose = require("mongoose");
 

const documentShema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
      },
      consultation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
        required: true,
      },
    nomDoc: { type: String, required: true },
    traitement:{type:[String], required:false,default:[]},
 
});
 
 

module.exports = mongoose.model("Document", documentShema);
