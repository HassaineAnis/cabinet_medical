const Navette = require("../models/Navette");
exports.ajouterNavette = async (req, res, next) => {
  console.log("ajout  fiche navette...", req.body);
  try {
    const navette = new Navette({
      ...req.body,
    });

    await navette.save();
    res.status(201).json({ message: "Fiche navette enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.afficherNavette = async (req, res, next) => {
  console.log("afficher liste fiche navettes...");
  try {
    const navettes = await Navette.find();
    res.status(200).json(navettes);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherdetailNavette = async (req, res, next) => {
  console.log("afficher details fiche navettes...");
  try {
    const navette = await Navette.findOne({ _id: req.params.id });
    res.status(200).json(navette);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.modifierNavette = async (req, res, next) => {
  console.log("modifer Analyse ...", req.body);
  try {
    const newNavette = await Navette.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (newNavette.nModified === 0) {
      return res.status(404).json({ message: "fiche navette introuvable" });
    }
    res.status(200).json({ message: "Fiche navette Modifier avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification de la fiche:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de la fiche." });
  }
};
