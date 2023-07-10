const Personnel = require('../models/Personnel');
const fs = require("fs")
const path = require('path');

  

exports.afficherPersonnel = (req,res,next) =>{
    console.log("afficher la des personnel")
    Personnel.find()
    .then(personnel =>{
      res.status(200).json(personnel);
      
    })
    .catch(error=>res.status(400).json({error}))

}

exports.ajouterPersonnel = (req,res,next)=>{
  console.log('ajouter personnel', req.body)
    let photoUrl = ""
     
   if(req.file){
     photoUrl=`${req.protocol}://${req.get('host')}/photo/${req.file.filename}`
   }
    const personnel = new Personnel({
        ...req.body,
        photo: photoUrl
          
       }) ;
      personnel.save()
      .then(()=> {
        console.log("cbonnn")
       
        
       res.status(201).json({message:"objet enregistre"});
    
        
      })
       
      .catch(error=>res.status(400).json({error}));
}

//supprimé un employé
exports.supprimerPersonnel = async (req,res,next) => {
  console.log("supprimer Personnel");
  try {
    const { id } = req.params;
     
     //recuperer l'utilisateur a supprimé
     const employeActuel = await Personnel.findOne({_id : req.params.id})
     //si l'utilisateur n'existe pas 
     if(!employeActuel){
      return res.status(404).json({ message: ' Employé introuvable.' });
     }
     
     // supprimé la photo de la base de donnees
      const filename = path.basename(employeActuel.photo);
      console.log("nom fichier: ",filename)
      fs.unlink(`photo/${filename}`, (error) => {
        if(error){
          console.error('error deleting file: ',error);
        }else{
          console.log('File deleted successfully');
        }
        
      })
     
     const result = await Personnel.deleteOne({ _id: id });
      console.log("voila")
    if (result.deletedCount === 0) {
      
      return res.status(404).json({ message: 'Employé introuvable.' });
    }
 
    res.status(200).json({ message: 'Employé supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'Employé.', error });
  }
 
}
//modifier un Employé
exports.modifierPersonnel = async (req,res,next)=>{

  let nouveauEmploye = { ...req.body, _id: req.params.id };
  console.log("Modification du profil de l'utilisateur...",nouveauEmploye);

  try {
    const employeCourant = await Personnel.findOne({ _id: req.params.id });

    if (!employeCourant) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Vérifier si une nouvelle photo est fournie
    if (req.file) {
      console.log("Une nouvelle photo est fournie");
      const imageUrl = `${req.protocol}://${req.get('host')}/photo/${req.file.filename}`;

      // Supprimer l'ancienne photo
      if (employeCourant.photo) {
        const filename = path.basename(employeCourant.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error('Erreur lors de la suppression de l\'ancienne photo :', error);
          }
        });
      }

      nouveauEmploye.photo = imageUrl;
    }else {
      if(req.body.photo === "" && employeCourant.photo !== ""){
        const filename = path.basename(employeCourant.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error('Erreur lors de la suppression de l\'ancienne photo :', error);
          }
        });

        
      }
    }
      
    
    // Mettre à jour le profil de l'utilisateur
    await Personnel.updateOne({ _id: req.params.id }, nouveauEmploye);

    res.status(200).json({ message: "Profil utilisateur modifié avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du profil de l'utilisateur.", error });
  }











  
 
}

exports.afficherUnPersonnel = (req,res,next) =>{
  console.log('afficher les details du medecin');
Personnel.findOne({_id:req.params.id})
.then(medecin =>res.status(200).json(medecin))
.catch(error=>res.status(400).json({error}))
}