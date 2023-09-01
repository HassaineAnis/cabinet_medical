const Surveillance = require("../models/Surveillance");

exports.ajouterSurveillance = async (req, res, next) => {
  console.log("ajout  fiche surveillance...", req.body);
  try {
    const surveillance = new Surveillance({
      ...req.body,
    });

    await surveillance.save();
    res.status(201).json({ message: "Fiche surveillance enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.afficherSurveillance = async (req, res, next) => {
  console.log("afficher liste fiche surveillance...");
  try {
    const surveillances = await Surveillance.find();
    res.status(200).json(surveillances);
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.afficherdetailSurveillance = async (req, res, next) => {
  console.log("afficher details fiche surveillance...");
  try {
    const surveillance = await Surveillance.findOne({ _id: req.params.id });
    res.status(200).json(surveillance);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.modifierSurveillance = async (req, res, next) => {
  console.log("modifer Surveillance ...", req.body);
  try {
    const newSurveillance = await Surveillance.updateOne(
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
