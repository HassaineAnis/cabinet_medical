const User = require("../models/User");
const Medecin = require('../models/Medecin');
const fs = require("fs")
const path = require('path');
 
 
exports.afficherUnUser = (req,res,next) =>{
  const {id} = req.params;
  User.findOne({_id : id})
  .then(user => res.status(200).json(user))
  .catch(error => res.status(400).json({ error }))
  

}

exports.modifierUser = async (req, res, next) => {
  let nouveauUser = { ...req.body, _id: req.params.id };
  console.log("Modification du profil de l'utilisateur...",nouveauUser);

  try {
    const userCourant = await User.findOne({ _id: req.params.id });

    if (!userCourant) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Vérifier si une nouvelle photo est fournie
    if (req.file) {
      console.log("Une nouvelle photo est fournie");
      const imageUrl = `${req.protocol}://${req.get('host')}/photo/${req.file.filename}`;

      // Supprimer l'ancienne photo
      if (userCourant.photo) {
        const filename = path.basename(userCourant.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error('Erreur lors de la suppression de l\'ancienne photo :', error);
          }
        });
      }

      nouveauUser.photo = imageUrl;
    }else {
      if(req.body.photo === "" && userCourant.photo !== ""){
        const filename = path.basename(userCourant.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error('Erreur lors de la suppression de l\'ancienne photo :', error);
          }
        });

        
      }
    }
      
    if(userCourant.role === "Médecin"){ 
      console.log("modifier specialite du medecin" ,req.body.specialite)
      const nouveauMedecin = {user:req.params.id,specialite:req.body.specialite}
     
     // const medecin =await  Medecin.findOne({user :req.params.id})
       
      await Medecin.updateOne({user:req.params.id}, nouveauMedecin);
     

    }
    // Mettre à jour le profil de l'utilisateur
    await User.updateOne({ _id: req.params.id }, nouveauUser);

    res.status(200).json({ message: "Profil utilisateur modifié avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du profil de l'utilisateur.", error });
  }
};


exports.afficherUsers = (req,res,next)=>{
  console.log('afficher utilisateurs',req.params)
 
const {role} = req.params
if(role === "tout"){
  User.find() 
  .then(users => {
      res.status(200).json(users);
      
  })
  .catch(error => res.status(400).json({ error }));
  
} 
else{
  User.find({role:role}) 
  .then(users => {
      res.status(200).json(users);
      
  })
  .catch(error => res.status(400).json({ error }));

}
 

}
 
//supprimer un utilisateur

exports.removeUser = async (req, res, next) => {
   
  try {
    const { id } = req.params;
     await Medecin.deleteOne({user: id})
     //recuperer l'utilisateur a supprimé
     const userActuel = await User.findOne({_id : req.params.id})
     //si l'utilisateur n'existe pas 
     if(!userActuel){
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
     }
     
     // const filename = userActuel.photo.split('/photo/');
      const filename = path.basename(userActuel.photo);
      console.log("nom fichier: ",filename)
      fs.unlink(`photo/${filename}`, (error) => {
        if(error){
          console.error('error deleting file: ',error);
        }else{
          console.log('File deleted successfully');
        }
        
      })
     
     const result = await User.deleteOne({ _id: id });
      console.log("voila")
    if (result.deletedCount === 0) {
      
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
 
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.', error });
  }
}; 



//authontification des utilisateur
exports.login = (req, res, next) => {
    console.log("voici id: ", req.body._id,' ',req.body.password)
    User.findOne({ _id: req.body._id })
        .then(user => {
            if(user.password === req.body.password){
                res.status(200).json({
                    userId : user._id ,
                    nom : user.nom,
                    prenom : user.prenom,
                    role  :user.role,
                    photo : user.photo,
                    token : 'TOKEN'
                 })
             } 
            else{
                res.status(401).json({message:"mot de passe incorrecte"});
            }
        })
        


        //dans le cas de mot de passe hasher dans la base de donnees
            /*
            
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            else{
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
                    });
                })
                .catch(error => res.status(500).json({ error }));
            }
        })*/
        .catch(error => res.status(500).json({ error }));
 };
 
/*
 exports.signUp =(req,res,next)=>{

    let photoUrl = ""
    if(req.file){
     photoUrl=`${req.protocol}://${req.get('host')}/photo/${req.file.filename}`
   }

   const { nom, prenom } = req.body;

  // Vérification de l'existence d'un utilisateur avec le même nom et prénom
  const existingUser =  User.findOne({ nom, prenom });
  if (existingUser) {
    console.log('ils existe deja')
    return res.status(409).json({ message: 'Un utilisateur avec le même nom et prénom existe déjà.' });
  }
     // Si aucun utilisateur existant n'est trouvé, procédez à l'enregistrement du nouvel utilisateur
   const user = new User({
    ...req.body,
    photo: photoUrl,
    }) ;
  user.save()
  .then(()=>res.status(201).json({message:'Utilisateur enregistré avec succès.'}))
  .catch(error=>res.status(400).json({error}));
   

 }*/
 exports.signUp = async (req, res, next) => {
    const { nom, prenom } = req.body;
    console.log(req.body)
    try {
      const existingUser = await User.findOne({ nom, prenom });
  
      if (existingUser) {
        return res.status(409).json({ error: "Un utilisateur avec le même prénom existe déjà." });
      }
  
      let photoUrl = "";
  
      if (req.file) {
        photoUrl = `${req.protocol}://${req.get('host')}/photo/${req.file.filename}`;
      }
  
      const user = new User({
        ...req.body,
        photo: photoUrl,
      });
  
      await user.save();
     
      // Créer une instance du médecin avec la référence à l'utilisateur
      if(req.body.role !== "Médecin"){
        console.log("c est pas un medecin ")
        res.status(201).json({message:"Utilisateur enregistré avec succés."})
      }

      else{

    
      
      const medecin = new Medecin({
        user: user._id,
        specialite: req.body.specialite,
      });
  
      try {
        // Enregistrer le médecin
        await medecin.save();
        return res.status(201).json({ message: "Utilisateur enregistré avec succès en tant que médecin.", user });
      } catch (error) {
        // Erreur lors de l'enregistrement dans la collection Medecin
        // Supprimer l'utilisateur précédemment enregistré
        await User.findByIdAndRemove(user._id);
        return res.status(400).json({ error: "Une erreur est survenue lors de l'enregistrement du médecin." });
      }}
    } catch (error) {
      return res.status(400).json({ error: "Une erreur est survenue lors de l'enregistrement de l'utilisateur." });
    }
  };