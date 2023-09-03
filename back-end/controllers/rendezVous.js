const RendezVous = require("../models/RendezVous");
function formatDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}
//ajouter un RDV
exports.ajouterRendezVous = (req, res, next) => {
  console.log("details rendez-vous:", req.body);

  const rdv = new RendezVous({
    ...req.body,
  });
  rdv
    .save()
    .then(() => res.status(201).json({ message: "rendez-vous enregistre" }))
    .catch((error) => res.status(400).json({ error }));
};
//afficher tous les RDV
exports.afficherRendezVous = async (req, res, next) => {
  console.log("liste des rendez-vous...");
  try {
    const rdvs = await RendezVous.find()
      .populate("medecin", "nom prenom ")
      .exec();

    if (!rdvs) {
      return res.status(404).json({ message: "rdv introuvable." });
    }

    res.status(200).json(rdvs);
  } catch (e) {
    return res.status(400).json({ e });
  }
};
//afficher un seul rendez-vous
exports.afficherUnRendezVous = (req, res, next) => {
  RendezVous.findOne({ _id: req.params.id })
    .then((rdv) => res.status(200).json(rdv))
    .catch((error) => res.status(400).json({ error }));
};

//afficher Les rdv pour une medecin specifique
exports.afficherRendezVousMedecin = (req, res, next) => {
  const { id } = req.params;
  RendezVous.find({ medecin: id })
    .then((rdv) => res.status(200).json(rdv))
    .catch((error) => res.status(400).json({ error }));
};
//afficher les rdv d'un patient specifique
exports.afficherRendezVousPatient = (req, res, next) => {
  console.log("afficher rendez-vous d'un patient", req.params.id);
  RendezVous.find({ patient: req.params.id })
    .then((rdv) => res.status(200).json(rdv))
    .catch((error) => res.status(400).json({ error }));
};
//supprimer rdv
exports.supprimerRendezVous = (req, res, next) => {
  const { id } = req.params;
  RendezVous.deleteOne({ _id: id })
    .then(() => res.status(200).json({ message: "Rendez-vous supperimé." }))
    .catch((error) => res.status(400).json({ error }));
};

//modifier RDV
exports.modifierRendezVous = async (req, res, next) => {
  console.log("modifier...", req.body);

  let nouveauRdv = {
    ...req.body,
    _id: req.params.id,
    date: formatDate(req.body.date),
  };
  try {
    const RdvActuel = await RendezVous.findOne({ _id: req.params.id });

    if (!RdvActuel) {
      return res.status(404).json({ message: "Rendez-vous introuvable." });
    }
    await RendezVous.updateOne({ _id: req.params.id }, nouveauRdv);
    res.status(200).json({ message: "Rendez-vous modifié avec succès." });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la mise à jour du rendez-vous.",
      error,
    });
    console.log("erreur", error);
  }
};

exports.confirmeRendezVous = async (req, res, next) => {
  console.log("comfirmé le rendez-vous...");
  try {
    const rendezVousComfirmer = {
      ...req.body,
      _id: req.params.id,
      status: true,
    };
    const RdvActuel = await RendezVous.findOne({ _id: req.params.id });

    if (!RdvActuel) {
      return res.status(404).json({ message: "Rendez-vous introuvable." });
    }
    await RendezVous.updateOne({ _id: req.params.id }, rendezVousComfirmer);
    res.status(200).json({ message: "Rendez-vous pris avec succès." });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la mise à jour du rendez-vous.",
      error,
    });
    console.log("erreur", error);
  }
};

exports.modifierDateRdv = async (req, res, next) => {
  console.log("modifer Analyse ...", req.body);
  try {
    const rdv = await RendezVous.updateOne(
      { _id: req.params.id },
      {
        $set: {
          date: req.body.date,
        },
      }
    );
    if (rdv.nModified === 0) {
      return res.status(404).json({ message: " rendz-vous introuvable" });
    }
    res.status(200).json({ message: "rendz-vous Modifier avec succès." });
  } catch (e) {
    console.error("Erreur lors de la modification du rendz-vous:", e);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de l'analyse." });
  }
};
