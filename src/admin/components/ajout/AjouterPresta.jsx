import React from "react";

import { useState, useRef } from "react";
import notification from "../../../util/Notifiation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { useNavigate, useParams } from "react-router-dom";

const AjouterPresta = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const formRef = useRef(null);
  const { id } = useParams();
  const prix = useRef(null);
  const prixConvention = useRef(null);
  const typeIntervention = useRef(null);

  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const verifierData = (e) => {
    e.preventDefault();

    openModal();
  };
  const envoyerData = async (e) => {
    closeModal();
    const data = {
      convention: id,
      typeIntervention: typeIntervention.current.value,
      prix: prix.current.value,
      prixConvention: prixConvention.current.value,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/convention/prestation",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite(`Prestation ajouté avec succès`);
        formRef.current.reset();
      } else {
        const { message } = await response.json();

        notification.echec(message);

        console.error(
          "Une erreur s'est produite lors de l'enregistrement du produit. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.log("nis");
      notification.echec(
        "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
      );
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container_form">
        <h2>Ajouter un Produit</h2>
        <hr />
        <form onSubmit={verifierData} ref={formRef}>
          <div className="input_section">
            <div className="input_conteneur">
              <label htmlFor="intervention">Type d'intervention</label>
              <input
                type="text"
                id="intervention"
                required
                ref={typeIntervention}
              />
            </div>
            <div className="input_conteneur">
              <label htmlFor="prix">Prix</label>
              <input type="number" id="prix" required ref={prix} />
            </div>
            <div className="input_conteneur">
              <label htmlFor="prixC">Prix de Convention</label>
              <input type="number" id="prixC" required ref={prixConvention} />
            </div>
          </div>

          <div className="btn">
            <button>Enregitrer</button>
            <span onClick={navigation}>Annuler</span>
          </div>
        </form>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="custom_modal"
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "2" },
          }}
        >
          <p> Voulez-vous confirmé l'ajout? </p>
          <div className="repense">
            <button onClick={envoyerData}>OUI</button>
            <button onClick={closeModal}>NON</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AjouterPresta;
