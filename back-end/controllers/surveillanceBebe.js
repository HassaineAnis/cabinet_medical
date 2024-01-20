const SurveillanceBebe = require("../models/SurveillanceBebe");
const ActeNaissance = require("../models/ActeNaissance");

exports.ajouterSurveillanceBebe = async (req, res, next) => {
  console.log("ajout  fiche surveillance du bebe...", req.body);
  try {
    const surveillance = new SurveillanceBebe({
      ...req.body,
    });

    await surveillance.save();
    res.status(201).json({ message: "Fiche surveillance enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.afficherSurveillanceBebe = async (req, res, next) => {
  console.log("afficher liste fiche surveillance du bebe...");
  try {
    const surveillances = await SurveillanceBebe.find();
    res.status(200).json(surveillances);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherSurveillanceBebeDetails = async (req, res, next) => {
  console.log("afficher details fiche surveillance bebe...");
  try {
    const surveillance = await SurveillanceBebe.findOne({ _id: req.params.id });
    res.status(200).json(surveillance);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.modifierSurveillanceBaby = async (req, res, next) => {
  console.log("modifer Surveillance bebe ...", req.body);
  try {
    const newSurveillance = await SurveillanceBebe.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (newSurveillance.nModified === 0) {
      return res
        .status(404)
        .json({ message: "fiche surveillance introuvable" });
    }
    res
      .status(200)
      .json({ message: "Fiche surveillance Modifier avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification de la fiche:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de la fiche." });
  }
};

exports.ajouterActeNaissance = async (req, res, next) => {
  console.log("ajout  acte de naissance  bebe...", req.body);
  try {
    const acte = new ActeNaissance({
      ...req.body,
    });

    await acte.save();
    res.status(201).json({ message: "Acte naissance enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.afficherNaissance = async (req, res, next) => {
  console.log("afficher liste des acte de naissance des bebe...");
  try {
    const actes = await ActeNaissance.find();
    res.status(200).json(actes);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherNaissanceDetails = async (req, res, next) => {
  console.log("afficher details acte naissance...");
  try {
    const surveillance = await ActeNaissance.findOne({ _id: req.params.id });

    res.status(200).json(surveillance);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.modifierNaissance = async (req, res, next) => {
  console.log("modifer Acte de Naissance bebe ...", req.body);
  try {
    const newActe = await ActeNaissance.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (newActe.nModified === 0) {
      return res.status(404).json({ message: "Acte Naissance introuvable" });
    }
    res
      .status(200)
      .json({ message: "Acte de Naissance Modifier avec succès." });
  } catch (e) {
    console.error(
      "Erreur lors de la modification de la l'acte de Naissance:",
      e
    );
    res.status(500).json({
      message: "Erreur lors de la modification de l'acte de naissance.",
    });
  }
};
