const Patient = require("../models/Patient");


//afficher Les Patients d'un medecin 
exports.afficherPatientMed = (req,res,next) =>{
    
    Patient.find({medecin:req.params.id})
    .then(rdv=>res.status(200).json(rdv))
    .catch(error=>res.status(400).json({error}))

}
//ajouter un patient
exports.ajouterPatient = (req,res,next) =>{
    console.log("details Patient:",req.body)
     
    const patient = new Patient({
        ...req.body
   })
   patient.save()
   .then(()=>res.status(201).json({message:"Patient enregistre"}))
   .catch(error=>res.status(400).json({error}))
 
}
//afficher les details d'un patient

exports.afficherUnPatient = (req,res,next) =>{
 Patient.findOne({_id:req.params.id})
    .then(rdv=>res.status(200).json(rdv))
    .catch(error=>res.status(400).json({error}))
}

//modifier Patient 
exports.modifierPatient = async(req,res,next) =>{

    console.log('modifier...',req.body) 
       
    let nouveauPatient = { ...req.body, _id: req.params.id };
    try{

        const patientActuel = await Patient.findOne({ _id: req.params.id });
       
        if (!patientActuel) {
             
          return res.status(404).json({ message: 'Patient introuvable.' });
        }
        await Patient.updateOne({ _id: req.params.id }, nouveauPatient);
        res.status(200).json({ message: "Patient modifié avec succès." });

    }
    catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du Patient.", error });
        console.log("erreur" ,error)
      }
    

}

