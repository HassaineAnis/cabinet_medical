const Medecin = require('../models/Medecin');
const User = require("../models/User");
const bcrypt =require('bcrypt');
 //afficher la liste
 /*
 exports.afficherMedecin = (req, res, next) => {
  console.log("Afficher la liste des médecins");
  Medecin.aggregate([
    {
      $lookup: {
        from: "users", // Nom de la collection "User"
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 1,
        specialite: 1,
        user: { $mergeObjects: "$user" }, // Inclure toutes les propriétés de l'utilisateur
      },
    },
  ])
    .then((medecins) => {
      res.status(200).json(medecins);
    })
    .catch((error) => res.status(400).json({ error }));
};
*/
//afficher la liste des medecins
exports.afficherMedecin = (req, res, next) => {
  console.log("Afficher la liste des médecins");
  Medecin.find()
    .populate("user")
    .exec()
    .then((medecins) => {
      res.status(200).json(medecins);
    })
    .catch((error) => res.status(400).json({ error }));
};


//afficher un seul medecin
exports.afficherUnMedecin = (req,res,next) =>{
    
  Medecin.findOne({user:req.params.id})
  .populate("user")
  .exec()
  .then((medecin) => {
    if (!medecin) {
      return res.status(404).json({ message: 'Médecin introuvable.' });
    }
    res.status(200).json(medecin);
  })
  .catch((error) => res.status(400).json({ error }));
}

//ajout d'un medecin
/*
exports.ajouterMedecin =(req,res,next)=>{
     
    let photoUrl = ""
    //console.log(req.file.filename)
   if(req.file){
     photoUrl=`${req.protocol}://${req.get('host')}/photo/${req.file.filename}`
   }
   bcrypt.hash(req.body.mot_passe,10)
   .then(hash => {
    const medecin = new Medecin({
      ...req.body,
      photo: photoUrl,
      
        
     }) ;
    medecin.save()
    .then(()=>res.status(201).json({message:"objet enregistre"}))
    .catch(error=>res.status(400).json({error}));
    
    const user =new User({
      _id: medecin._id,
      nom :  req.body.nom,
      prenom :  req.body.prenom,
      mot_passe :  req.body.mot_passe,
      role :"MEDECIN"
     });
     user.save()
     .then(()=>console.log("nouvel utilisateur créé avec succès"))
    .catch(error => console.log("une erreur cest profuit ",error))
     
      })

   
   .catch(error=>res.status(500).json({error}));
    }
   /*
const medecin = new Medecin({
    ...req.body,
    photo: photoUrl
      
   }) ;
  medecin.save()
  .then(()=>res.status(201).json({message:"objet enregistre"}))
  .catch(error=>res.status(400).json({error}));
 
  //ajouter le medecin en tant que nouveau utilisateur
 


 
exports.supprimerMedecin = (req,res,next)=>{
  console.log('supprimer Medecin')
    Medecin.deleteOne({_id:req.params.id})
    .then(()=>res.status(200).json({message:'medecin supperimé'}))
    .catch(error=>res.status(400).json({error}))
  
    User.deleteOne({_id:req.params.id})

    .then(result=>{
      if(result.deletedCount === 1){
        return console.log("utilisateur supprimer avec succé")
      }else{
        return console.log("utilisateur non supprimer")
      }
    })
    .catch(error=>console.log("erreur de suppression de l'utilisateur : ",error))


}

 
exports.modifierMedecin = (req,res,next)=>{
  let objectMedecin = {...req.body,_id:req.params.id};
 
  if (req.file) {
    const photoUrl = `${req.protocol}://${req.get('host')}/photo/${req.file.filename}`;
    objectMedecin.photo = photoUrl;
  }
  Medecin.updateOne({_id: req.params.id},objectMedecin)
  .then(()=>res.status(200).json({message:"objet Modifier"}))
  .catch(error => res.status(400).json({error}))
 
  User.updateOne({idUser:req.params.id},
    {
       _id: req.params.id,
      nom :  req.body.nom,
      prenom :  req.body.prenom,
      mot_passe :  req.body.mot_passe,
      role:"Medecin"
    })
    .then(()=>console.log("user modifier avec succè"))
    .catch(error=>console.log("un probleme est survenu:",error))
}
*/