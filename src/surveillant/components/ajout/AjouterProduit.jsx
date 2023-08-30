import React, { useRef } from "react";
import "../../../style/medecinStyle/ajout/ajoutconsult.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
const AjouterProduit = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const denominationRef = useRef(null);
  const dciRef = useRef(null);
  const prixRef = useRef(null);
  const formRef = useRef(null);
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      denominationComerciale: denominationRef.current.value,
      dci: dciRef.current.value,
      prix: prixRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/produit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("Produit ajouter avec succés.");
        formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'ajout du produit.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="ajouterConsult">
        <div className="ajouterConsult_entete">
          <h2>Ajouter un nouveau rendez-vous</h2>
          <span>Veuillez remplire les champs</span>
        </div>
        <form onSubmit={verificationData} ref={formRef}>
          <div className="input_container">
            <label htmlFor="denomination">Dénomination Comerciale</label>
            <input
              type="text"
              id="denomination"
              ref={denominationRef}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dci">DCI</label>
            <input type="text" id="dci" ref={dciRef} required />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="prix">Prix Unitaire</label>
            <input type="number" id="prix" ref={prixRef} required />
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
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
        >
          <p> Confirmé l'enregistrement du produit? </p>
          <div className="repense">
            <button onClick={enregitrer}>OUI</button>
            <button onClick={closeModal}>NON</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AjouterProduit;
