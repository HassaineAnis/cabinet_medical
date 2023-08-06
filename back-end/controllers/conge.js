const Conge = require("../models/Conge")
const Personnel = require("../models/Personnel")
const User = require("../models/User")

exports.ajoutConge = async (req, res, next) => {
  console.log("ajout conge :", req.body);

  try {
    const conge = new Conge({
      ...req.body,
    });

    await conge.save();
    res.status(201).json({ message: "conge enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};



exports.afficherCongePersonnel = (req, res, next) => {
  console.log("details consultation");
   Conge.find({ typeEmpoye:"personnel"})
    .populate({path:"employe remplacant",model:Personnel}) // Populate the 'patient' field with the patient's details
    .exec()
    .then(conge => {
      if (!conge) {
        return res.status(404).json({ message: 'congé introuvable.' });
      }
      const totalDaysPerUserAndYear = {};
      conge.forEach(congeItem => {
        const userId = congeItem.employe._id;
        const year = new Date(congeItem.dateSortie).getFullYear();
        if (!totalDaysPerUserAndYear[userId]) {
          totalDaysPerUserAndYear[userId] = {};
        }
        if (totalDaysPerUserAndYear[userId][year]) {
          totalDaysPerUserAndYear[userId][year] += congeItem.nombreJour;
        } else {
          totalDaysPerUserAndYear[userId][year] = congeItem.nombreJour;
        }
      });
      
       
      // Return the consultation details along with patient's nom and prenom
      return res.status(200).json({conge,totalDaysPerUserAndYear});
    })
    .catch(error => res.status(400).json({ error }));
  
  };
  
  exports.afficherCongeUsers = (req, res, next) => {
    Conge.find({ typeEmpoye : { $ne: "personnel" } })
    .populate({path:"employe remplacant",model:User}) // Populate the 'patient' field with the patient's details
    .exec()
    .then(conge => {
      if (!conge) {
        return res.status(404).json({ message: 'congé introuvable.' });
      }
 

      const totalDaysPerUserAndYear = {};
      conge.forEach(congeItem => {
        const userId = congeItem.employe._id;
        const year = new Date(congeItem.dateSortie).getFullYear();
        if (!totalDaysPerUserAndYear[userId]) {
          totalDaysPerUserAndYear[userId] = {};
        }
        if (totalDaysPerUserAndYear[userId][year]) {
          totalDaysPerUserAndYear[userId][year] += congeItem.nombreJour;
        } else {
          totalDaysPerUserAndYear[userId][year] = congeItem.nombreJour;
        }
      });
       
      
       
      // Return the consultation details along with patient's nom and prenom
      return res.status(200).json({ conge, totalDaysPerUserAndYear });
    })
    .catch(error => res.status(400).json({ error }));
  
  };


  //supprimer un congé 
  exports.supprimerConge = async (req,res,next) =>{
    console.log("suppression congé...")
    try{
      await Conge.deleteOne({_id:req.params.id})
      res.status(200).json({message:"conge supprimer avec succée."})
      console.log("congé supprimé.")
    }
    catch(error){
      res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression du congé.', error });
      console.log("Erreur lors de la supperssion.")

    }

  }
  exports.archiverConge = async (req,res,next)=>{
    console.log("Archivation du congé ", req.params.id);
    try {
      // Update the "conge" and set the "archive" field to true
      const result = await Conge.updateOne({ _id: req.params.id }, { $set: { archive: true } });
  
      // Check if any document was updated
      if (result.nModified === 0) {
        return res.status(404).json({ message: "Congé introuvable" });
      }
  
      // Send a success response
      res.status(200).json({ message: "Congé archivé avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'archivage du congé:", error);
      res.status(500).json({ message: "Erreur lors de l'archivage du congé." });
    }
  }

  exports.modifierConge = async (req,res,next) =>{
    console.log("modifer Congé ...", req.body)

    try {
      // Update the "conge" and set the "archive" field to true
      const result = await Conge.updateOne({ _id: req.params.id }, { $set: {dateSortie:req.body.dateSortie,nombreJour:req.body.nombreJour,remplacant:req.body.remplacant} });
  
      // Check if any document was updated
      if (result.nModified === 0) {
        return res.status(404).json({ message: "Congé introuvable" });
      }
  
      // Send a success response
      res.status(200).json({ message: "Congé Modier avec succès." });
    } catch (error) {
      console.error("Erreur lors de la modification du congé:", error);
      res.status(500).json({ message: "Erreur lors de la modification du congé." });
    }
  }
   