const Intervention = require("../models/Intervention");

exports.ajouterIntervention = async (req, res, next) => {
  console.log("interventiion...", req.body);
  try {
    const intervention = new Intervention({
      ...req.body,
    });

    await intervention.save();
    res.status(201).json({ message: "Intervention enregistre" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.afficherInterventionPatient = (req, res, next) => {
  console.log("Intervention patient", req.params.id);
  Intervention.find({ patient: req.params.id })
    .then((consult) => res.status(200).json(consult))
    .catch((error) => res.status(400).json({ error }));
};

exports.afficherDetailIntervention = (req, res, next) => {
  console.log("details intervention");
  Intervention.findOne({ _id: req.params.id })
    .populate("patient", "nom prenom") // Populate the 'patient' field with the patient's details
    .exec()
    .then((consult) => {
      if (!consult) {
        return res.status(404).json({ message: "Consultation introuvable." });
      }
      // Return the consultation details along with patient's nom and prenom
      return res.status(200).json({
        ...consult.toJSON(),
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifierIntervention = async (req, res, next) => {
  console.log("modifier intervention....");
  try {
    // Update the "conge" and set the "archive" field to true
    const result = await Intervention.updateOne(
      { _id: req.params.id },
      {
        $set: req.body, // Use $set to update the provided fields
      }
    );

    // Check if any document was updated
    if (result.nModified === 0) {
      return res.status(404).json({ message: "intervention introuvable" });
    }

    // Send a success response
    res.status(200).json({ message: "Intervention Modier avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification de l'intervention:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la modification de l'intervention." });
  }
};
