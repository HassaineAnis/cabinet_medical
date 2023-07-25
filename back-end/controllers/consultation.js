const Consultation = require("../models/Consultation");
const Document = require('../models/Document')


// ajouter une consultation

exports.ajoutConsultation = async(req,res,next)=>{
console.log("consultation", req.body)
const newConsultation = {...req.body ,informationsMedical:JSON.parse(req.body.informationsMedical),symptome:JSON.parse(req.body.symptome)};
 

    try{
        let fichiersUrl =  "";
 
       if (req.files){
        fichiersUrl = req.files.map((file) => `${req.protocol}://${req.get('host')}/document/${file.filename}`);
        }
        //on enregistre la consultation 
        const consultation = new Consultation({
            ...newConsultation,
            fichierExterne:fichiersUrl
   
       })
       await consultation.save()
       return res.status(201).json({ message: "Consultation enregistré  avec succée."});
       
      
    }
    catch(error){
        return res.status(400).json({ error: "Une erreur est survenue lors de l'enregistrement de la consultation." });

    }
 

    
    

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

exports.afficherConsultationPatient = (req,res,next) =>{
    console.log('consultation patient', req.params.id)
    Consultation.find({patient:req.params.id})
    .then(rdv=>res.status(200).json(rdv))
    .catch(error=>res.status(400).json({error}))

}