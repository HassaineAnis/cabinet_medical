const Analyse = require("../models/AnalyseM");

exports.ajouterAnalyse = async (req, res, next) => {
  console.log("ajout analyse medicle...", req.body);
  try {
    const analyse = new Analyse({
      ...req.body,
    });

    await analyse.save();
    res.status(201).json({ message: "analyse enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.afficherAnalysePatient = async (req, res, next) => {
  console.log("affichage les analyse d'un patient...");
  try {
    const analyses = await Analyse.find({ patient: req.params.id })
      .populate("patient", "nom prenom age sexe adresse")
      .exec();

    if (!analyses) {
      return res.status(404).json({ message: "Analyse introuvable." });
    }

    const patient = { ...analyses[0].patient.toJSON() };
    res.status(200).json({ analyses, patient });
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherUneAnalyse = async (req, res, next) => {
  console.log("affichage details analyse...");

  Analyse.findOne({ _id: req.params.id })
    .populate("patient", "nom prenom age sexe adresse") // Populate the 'patient' field with the patient's details
    .exec()
    .then((analyse) => {
      if (!analyse) {
        return res.status(404).json({ message: "Analyse introuvable." });
      }
      // Return the consultation details along with patient's nom and prenom
      return res.status(200).json({
        ...analyse.toJSON(),
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifierAnalyse = async (req, res, next) => {
  console.log("modifer Analyse ...", req.body);
  try {
    const nouveuAnalyse = await Analyse.updateOne(
      { _id: req.params.id },
      {
        $set: {
          date: req.body.date,
          service: req.body.service,
          document: req.body.document,
        },
      }
    );
    if (nouveuAnalyse.nModified === 0) {
      return res.status(404).json({ message: "Analyse introuvable" });
    }
    res.status(200).json({ message: "Analyse Modifier avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification de l'analyse:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de l'analyse." });
  }
};
