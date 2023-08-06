const Magasin = require("../models/Magasin");
const fs = require("fs");
const path = require("path");

function modifyObjectByNom(arr, nom, newQntRequis, newQntActuel) {
  const foundIndex = arr.findIndex((obj) => obj.nom === nom);
  if (foundIndex !== -1) {
    arr[foundIndex].qntRequis = newQntRequis;
    arr[foundIndex].qntActuel = newQntActuel;
  }
}

exports.afficherProduit = async (req, res, next) => {
  try {
    const produits = await Magasin.find();
    res.status(200).json(produits);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.afficherUnProduit = async (req, res, next) => {
  console.log("affichage un produit...");
  try {
    const produit = await Magasin.findOne({ _id: req.params.id });
    res.status(200).json(produit);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
exports.ajouterProduit = async (req, res, next) => {
  console.log("ajouter Produit..", req.body);

  let photoUrl = "";
  if (req.file) {
    photoUrl = `${req.protocol}://${req.get("host")}/photo/${
      req.file.filename
    }`;
  }
  try {
    const produitExistant = await Magasin.findOne({ nom: req.body.nom });
    if (produitExistant) {
      return res
        .status(409)
        .json({ error: "Produit deja present dans la base de données!" });
    }
    const produit = new Magasin({
      ...req.body,
      photo: photoUrl,
    });
    await produit.save();
    res.status(201).json({ message: "Produit enregistre" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.modifierQntService = async (req, res, next) => {
  console.log("modifier qnt...", req.body);

  try {
    let newPhoto = req.body.photo;

    const produit = await Magasin.findOne({ _id: req.params.id });

    if (req.file) {
      console.log("Une nouvelle photo est fournie");
      const imageUrl = `${req.protocol}://${req.get("host")}/photo/${
        req.file.filename
      }`;

      // Supprimer l'ancienne photo
      if (produit.photo) {
        const filename = path.basename(produit.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error(
              "Erreur lors de la suppression de l'ancienne photo :",
              error
            );
          }
        });
      }

      newPhoto = imageUrl;
    } else {
      if (req.body.photo === "" && produit.photo !== "") {
        const filename = path.basename(produit.photo);
        console.log("Nom du fichier à supprimer :", filename);
        fs.unlink(`photo/${filename}`, (error) => {
          if (error) {
            console.error(
              "Erreur lors de la suppression de l'ancienne photo :",
              error
            );
          }
        });
      }
    }
    const newService = produit.service;
    modifyObjectByNom(
      newService,
      req.body.nom,
      parseInt(req.body.qntRequis),
      parseInt(req.body.qntActuel)
    );
    console.log(newService);
    await Magasin.updateOne(
      { _id: req.params.id },
      {
        $set: {
          nom: req.body.nomProduit,
          photo: newPhoto,
          service: newService,
          quantite: parseInt(req.body.quantite),
        },
      }
    );
    res.status(200).json({ message: "Quantité modifier avec succée." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la modification des quantités." });
  }
};

exports.supprimerProduit = async (req, res, next) => {
  try {
    const { id } = req.params;

    //recuperer l'utilisateur a supprimé
    const produit = await Magasin.findOne({ _id: req.params.id });
    //si l'utilisateur n'existe pas
    if (!produit) {
      return res.status(404).json({ message: " Produit introuvable." });
    }

    // supprimé la photo de la base de donnees
    const filename = path.basename(produit.photo);
    console.log("nom fichier: ", filename);
    fs.unlink(`photo/${filename}`, (error) => {
      if (error) {
        console.error("error deleting file: ", error);
      } else {
        console.log("File deleted successfully");
      }
    });

    const result = await Magasin.deleteOne({ _id: id });
    console.log("voila");
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Produit introuvable." });
    }

    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression du produit.",
      error,
    });
  }
};
