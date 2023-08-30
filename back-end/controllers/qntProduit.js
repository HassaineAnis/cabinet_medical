const QntProduit = require("../models/QntProduit");
const Produit = require("../models/Produits");

exports.ajouterQuantite = async (req, res, next) => {
  console.log("ajout une quantité de produit...", req.body);
  try {
    const produit = new QntProduit({
      ...req.body,
      quantite: parseInt(req.body.quantite),
    });

    await produit.save();
    res.status(201).json({ message: "Quantité produit enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.retirerQuantite = async (req, res, next) => {
  console.log("retirer une quantité de produit...", req.body);
  try {
    const produit = new QntProduit({
      ...req.body,
      quantite: parseInt(req.body.quantite),
    });

    await produit.save();
    res.status(201).json({ message: "Quantité produit enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.afficherQuantite = async (req, res, next) => {
  console.log("afficher quantité produits...");
  try {
    const quantites = await QntProduit.find({ produit: req.params.id });
    const produit = await Produit.findOne({ _id: req.params.id });

    res.status(200).json({ quantites, produit });
  } catch (e) {
    return res.status(400).json({ e });
  }
};
