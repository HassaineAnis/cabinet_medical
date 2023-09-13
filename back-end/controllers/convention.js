const Convention = require("../models/Convention");
const Prestation = require("../models/Prestation");
exports.ajouterConvention = async (req, res, next) => {
  console.log("ajout  convention...", req.body);
  try {
    const existingConvention = await Convention.findOne({
      convention: req.body.convention, // Remplacez champUnique par le nom du champ qui doit être unique
    });

    if (existingConvention) {
      console.log("existe");
      // Si une convention similaire existe déjà, renvoyez une erreur
      return res.status(400).json({ message: "Cette convention existe déjà." });
    }
    const convention = new Convention({
      ...req.body,
    });

    await convention.save();
    res.status(201).json({ message: "Convention enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.afficherConvention = async (req, res, next) => {
  console.log("afficher liste des convention...");
  try {
    const conventions = await Convention.find();
    res.status(200).json(conventions);
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.ajouterPrestation = async (req, res, next) => {
  console.log("ajout  prestation...", req.body);
  try {
    const existingConvention = await Prestation.findOne({
      convention: req.body.convention,
      typeIntervention: req.body.typeIntervention,
      // Remplacez champUnique par le nom du champ qui doit être unique
    });

    if (existingConvention) {
      // Si une convention similaire existe déjà, renvoyez une erreur
      return res.status(400).json({ message: "Cette Prestation existe déjà." });
    }
    const prestation = new Prestation({
      ...req.body,
    });

    await prestation.save();
    res.status(201).json({ message: "Convention enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.afficherPrestation = async (req, res, next) => {
  console.log("afficher liste des prestation...");
  try {
    const prestation = await Prestation.find({ convention: req.params.id });
    const convention = await Convention.findOne({ _id: req.params.id });
    console.log(convention);
    res.status(200).json({ prestation, convention });
  } catch (e) {
    return res.status(400).json({ e });
  }
};
