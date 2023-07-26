const Consultation = require("../models/Consultation");
 


// ajouter une consultation

exports.ajoutConsultation = async(req,res,next)=>{
console.log("consultation", req.body)
const newConsultation = {...req.body ,informationsMedical:JSON.parse(req.body.informationsMedical),symptome:JSON.parse(req.body.symptome)};

let fichierExterneUrl =  "";
let documentMedicalUrl =  "";
 
      //verifie des fichier sont envoyé du coté front 
if (req.files){
    //si oui
    //on recupere les fichiers avec le nom de champs documentMedical s'il existe
    documentMedicalUrl =  req.files["documentMedical"] && req.files["documentMedical"].map((file) => `${req.protocol}://${req.get('host')}/document/${file.filename}`);
    //on recupere les fichiers avec  le nom de champs fichierExterne s'il existe 
    fichierExterneUrl =req.files["fichierExterne"] && req.files["fichierExterne"].map((file) => `${req.protocol}://${req.get('host')}/document/${file.filename}`);
 
    }

    try{
         
        //on enregistre la consultation 
        
        const consultation = new Consultation({
            ...newConsultation,
            fichierExterne:fichierExterneUrl,
            documentMedical: documentMedicalUrl
   
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
    .then(consult=>res.status(200).json(consult))
    .catch(error=>res.status(400).json({error}))

}