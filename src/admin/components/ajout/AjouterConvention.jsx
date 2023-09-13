import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import notification from "../../../util/Notifiation";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { useNavigate } from "react-router-dom";

const AjouterConvention = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const formRef = useRef(null);
  const [convention, setConvention] = useState("");
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
    const data = { convention: convention };

    try {
      const response = await fetch("http://localhost:3000/api/convention", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite(`Convention ajouté avec succès`);
        setConvention("");
      } else {
        const { message } = await response.json();
        console.log("erreur:", message);
        notification.echec(message);

        console.error(
          "Une erreur s'est produite lors de l'enregistrement de la convention. Veuillez réessayer."
        );
      }
    } catch (error) {
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
              <label htmlFor="denomination">Convention</label>
              <input
                type="text"
                id="denomination"
                required
                onChange={(e) => setConvention(e.target.value)}
                value={convention}
              />
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

export default AjouterConvention;
