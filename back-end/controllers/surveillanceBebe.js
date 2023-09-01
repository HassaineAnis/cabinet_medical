const SurveillanceBebe = require("../models/SurveillanceBebe");
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
