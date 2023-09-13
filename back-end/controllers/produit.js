const Produit = require("../models/Produits");
const QntProduit = require("../models/QntProduit");

exports.afficherProduit = async (req, res, next) => {
  console.log("afficher produits...", req.body);
  try {
    const produits = await Produit.find();

    const produitsAvecQuantite = [];

    for (const produit of produits) {
      // Récupérez les quantités ajoutées pour ce produit
      const quantitesAjoutees = await QntProduit.find({
        produit: produit._id,
        typeOperation: "ajout",
      });

      // Récupérez les quantités retirées pour ce produit
      const quantitesRetirees = await QntProduit.find({
        produit: produit._id,
        typeOperation: "retrait",
      });

      // Calculez la quantité totale ajoutée
      const quantiteTotaleAjoutee = quantitesAjoutees.reduce(
        (total, quantiteAjoutee) => total + quantiteAjoutee.quantite,
        0
      );

      // Calculez la quantité totale retirée
      const quantiteTotaleRetiree = quantitesRetirees.reduce(
        (total, quantiteRetiree) => total + quantiteRetiree.quantite,
        0
      );

      // Calculez la quantité totale pour ce produit
      const quantiteTotale = quantiteTotaleAjoutee - quantiteTotaleRetiree;

      // Ajoutez le produit avec sa quantité totale au tableau de résultats
      produitsAvecQuantite.push({
        ...produit.toObject(),
        quantiteTotale,
      });
    }

    res.status(200).json(produitsAvecQuantite);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherDetailProduit = async (req, res, next) => {
  console.log("detail produit");
  try {
    const produit = await Produit.findOne({ _id: req.params.id });
    const qntProduit = await QntProduit.find({ produit: req.params.id });
    let quantiteTotaleAjoutee = 0;
    let quantiteTotaleRetiree = 0;

    // Parcourir les enregistrements de qntProduit pour calculer la quantité ajoutée et retirée
    qntProduit.forEach((item) => {
      if (item.typeOperation === "ajout") {
        quantiteTotaleAjoutee += item.quantite;
      } else if (item.typeOperation === "retrait") {
        quantiteTotaleRetiree += item.quantite;
      }
    });
    const quantiteTotale = quantiteTotaleAjoutee - quantiteTotaleRetiree;

    res.status(200).json({ quantiteTotale, produit });
  } catch (e) {
    return res.status(400).json({ e });
  }
};

exports.ajouterProduit = async (req, res, next) => {
  console.log("ajout d'un produit...", req.body);
  try {
    const produit = new Produit({
      ...req.body,
      prix: parseInt(req.body.prix),
    });

    await produit.save();
    res.status(201).json({ message: "Produit enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.modifierProduit = async (req, res, next) => {
  console.log("modifer Produit ...", req.body);
  try {
    const newProduit = await Produit.updateOne(
      { _id: req.params.id },
      {
        $set: {
          denominationComerciale: req.body.denominationComerciale,
          dci: req.body.dci,
          prix: req.body.prix,
        },
      }
    );
    if (newProduit.nModified === 0) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.status(200).json({ message: "Produit Modifier avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification du produit:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification du produit." });
  }
};
