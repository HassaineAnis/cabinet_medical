const Consultation = require("../models/Consultation");


// ajouter une consultation

exports.ajoutConsultation = (req,res,next)=>{
console.log("consultation",req.body)

    const consultation = new Consultation({
         ...req.body
    })
    consultation.save()
    .then(()=>res.status(201).json({message:"objet enregistre"}))
    .catch(error=>res.status(400).json({error}))

}
exports.afficherConsultation = (req,res,next) =>{
    Consultation.find()
    .then(consultation =>{
        res.status(200).json(consultation);
        
      })
      .catch(error=>res.status(400).json({error}))
}

exports.supprimerConsultation = (req,res,next) =>{
    Consultation.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'medecin supperimé'}))
    .catch(error=>res.status(400).json({error}))
}