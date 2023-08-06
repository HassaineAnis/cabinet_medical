const mongoose = require("mongoose");
 

const congeShema = mongoose.Schema({
    employe: {
        type: mongoose.Schema.Types.ObjectId,
     
        required: true,
      },
      remplacant:{
        type: mongoose.Schema.Types.ObjectId,
         
        required: false,
         
      },
      typeEmpoye: {
        type: String,required: true, },

  dateSortie: { type: Date, required: true },
  nombreJour: { type: Number, required: true },
  archive:{type:Boolean,required:false,default:false}
  
  
 
});
 
 

module.exports = mongoose.model("Conge", congeShema);
