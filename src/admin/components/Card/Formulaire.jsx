import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
import { format } from "date-fns";

const Formulaire = ({
  data,
  updateQntActuel,
  totalQntActuel,
  id,
  qntProduit,
  nomProduit,
  photo,
}) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [qntRequis, setRequis] = useState(data.qntRequis);
  const [qntActuel, setActuel] = useState(data.qntActuel);

  const calculerQntManquante = (qntDispo, qntRequis) => {
    if (qntDispo > qntRequis) {
      return 0;
    } else {
      return qntRequis - qntDispo;
    }
  };
  const [qntManquante, setManquante] = useState(
    calculerQntManquante(data.qntActuel, data.qntRequis)
  );
  const modifierQntA = (e) => {
    setActuel(e.target.value);
    setManquante(calculerQntManquante(e.target.value, qntRequis));
    updateQntActuel(parseInt(e.target.value, 10));
  };
  const modifierQntR = (e) => {
    setRequis(e.target.value);
    setManquante(calculerQntManquante(qntActuel, e.target.value));
  };
  const verifierTotal = () => {
    if (qntProduit < totalQntActuel) {
      return notification.echec("veuillez augmenté le quantité du produit.");
    }
    openModal();
  };
  const envoyerData = async (e) => {
    closeModal();

    const formaData = new FormData();
    formaData.append("photo", photo);
    formaData.append("nomProduit", nomProduit);
    formaData.append("quantite", qntProduit);
    formaData.append("nom", data.nom);
    formaData.append("qntRequis", qntRequis);
    formaData.append("qntActuel", qntActuel);

    try {
      const response = await fetch(
        `http://localhost:3000/api/magasin/service/${id}`,
        {
          method: "PUT",

          body: formaData,
        }
      );

      if (response.ok) {
        notification.reussite(`Quantité mis a jour avec succès`);
        //  formulaireRef.current.reset();
      } else {
        // const erreurData = await response.json();

        notification.echec("Erreur lors du la mise a jour.");

        console.error(
          "Une erreur s'est produite lors de l'enregistrement du congé. Veuillez réessayer."
        );
      }
    } catch (error) {
      notification.echec(
        "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
      );
    }
  };

  return (
    <div className="service_info">
      <h3 style={{ textTransform: "capitalize" }}>{data.nom}</h3>
      <div className="input_conteneur">
        <label htmlFor="service">Quantité requis</label>
        <input
          type="number"
          value={qntRequis}
          onChange={(e) => {
            modifierQntR(e);
          }}
        />
      </div>
      <div className="input_conteneur">
        <label htmlFor="service">Quantité Actuel</label>
        <input
          type="number"
          value={qntActuel}
          onChange={(e) => modifierQntA(e)}
        />
      </div>
      <div className="input_conteneur">
        <label htmlFor="service">Quantité manquante</label>
        <input type="number" readOnly={true} value={qntManquante} />
      </div>
      <button onClick={verifierTotal}>Modifier</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "2" },
        }}
      >
        <p> Voulez-vous confirmé ces modification? </p>
        <div className="repense">
          <button onClick={envoyerData}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </div>
  );
};

export default Formulaire;
