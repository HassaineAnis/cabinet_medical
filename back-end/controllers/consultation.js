const Consultation = require("../models/Consultation");

// ajouter une consultation

exports.ajoutConsultation = async (req, res, next) => {
  console.log("consultation", req.body);
  const newConsultation = {
    ...req.body,
    informationsMedical: JSON.parse(req.body.informationsMedical),
    symptome: JSON.parse(req.body.symptome),
    documentMedical: JSON.parse(req.body.documentMedical),
  };

  let fichierExterneUrl = "";
  //let documentMedicalUrl =  [];

  //verifie des fichier sont envoyé du coté front
  if (req.files) {
    //si oui
    //on recupere les fichiers avec le nom de champs documentMedical s'il existe
    /*
    if(req.files['documentMedical']){
        documentMedicalUrl = req.files["documentMedical"].map((file)=>({url:`${req.protocol}://${req.get('host')}/document/${file.filename}`,nom : file.originalname,}
        ))
    }*/

    if (req.files["fichierExterne"]) {
      fichierExterneUrl = req.files["fichierExterne"].map((file) => ({
        url: `${req.protocol}://${req.get("host")}/document/${file.filename}`,
        nom: file.originalname,
      }));
    }
  }

  try {
    //on enregistre la consultation

    const consultation = new Consultation({
      ...newConsultation,
      fichierExterne: fichierExterneUrl,
    });
    await consultation.save();
    return res
      .status(201)
      .json({ message: "Consultation enregistré  avec succée." });
  } catch (error) {
    return res.status(400).json({
      error:
        "Une erreur est survenue lors de l'enregistrement de la consultation.",
    });
  }
};

exports.afficherConsultation = async (req, res, next) => {
  console.log("afficher toutes les consultions...");
  try {
    const consult = await Consultation.find()
      .populate("medecin", "nom prenom ")
      .populate("patient", "nom prenom")
      .exec();

    if (!consult) {
      return res.status(404).json({ message: "consultations introuvable." });
    }

    res.status(200).json(consult);
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.supprimerConsultation = (req, res, next) => {
  Consultation.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "medecin supperimé" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.afficherConsultationPatient = (req, res, next) => {
  console.log("consultation patient", req.params.id);
  Consultation.find({ patient: req.params.id })
    .then((consult) => res.status(200).json(consult))
    .catch((error) => res.status(400).json({ error }));
};
exports.afficherDetailConsultation = (req, res, next) => {
  console.log("details consultation");
  Consultation.findOne({ _id: req.params.id })
    .populate("patient", "nom prenom age")
    .populate("medecin", "nom prenom ")
    .exec()
    .then((consult) => {
      if (!consult) {
        return res.status(404).json({ message: "Consultation introuvable." });
      }

      // You can access patient's nom and prenom from the populated 'patient' field

      // Return the consultation details along with patient's nom and prenom
      return res.status(200).json({
        ...consult.toJSON(),
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifierStatus = async (req, res, next) => {
  console.log("payé consultation ...");
  try {
    const payer = await Consultation.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: true,
        },
      }
    );
    if (payer.nModified === 0) {
      return res.status(404).json({ message: "consultation introuvable" });
    }
    res.status(200).json({ message: "Consultation payé avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification de la consultation:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de la consultation." });
  }
};
