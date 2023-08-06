import React from "react";
import medecin from "../../../assets/medecin.jpg";
import { useState, useRef } from "react";
import notification from "../../../util/Notifiation";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { useNavigate } from "react-router-dom";

const AjouterProduit = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const nomRef = useRef(null);
  const quantiteRef = useRef(null);
  const navigate = useNavigate();
  const photoRef = useRef("");
  const [imageUrl, setImageUrl] = useState(null);
  const formRef = useRef(null);

  const ajouterPhoto = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const resetPhoto = (e) => {
    setImageUrl(null);
    photoRef.current.value = null;
  };
  const navigation = () => {
    navigate(-1);
  };
  const verifierData = (e) => {
    e.preventDefault();

    openModal();
  };
  const envoyerData = async (e) => {
    closeModal();
    //formater les donnees avant envoie
    const formaData = new FormData();
    formaData.append("photo", photoRef.current.files[0]);
    formaData.append("nom", nomRef.current.value);
    formaData.append("quantite", parseInt(quantiteRef.current.value));

    try {
      const response = await fetch("http://localhost:3000/api/magasin", {
        method: "POST",
        body: formaData,
      });

      if (response.ok) {
        notification.reussite(`Produit ajouté avec succès`);
        formRef.current.reset();
        resetPhoto();
      } else {
        const { error } = await response.json();
        console.log(envoyerData);
        notification.echec(error);

        console.error(
          "Une erreur s'est produite lors de l'enregistrement du produit. Veuillez réessayer."
        );
      }
    } catch (error) {
      notification.echec(
        "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
      );
    }
  };

  return (
    <div className="container_form">
      <ToastContainer />
      <h2>Ajouter un Produit</h2>
      <hr />
      <form
        ref={formRef}
        onSubmit={verifierData}
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="image_upload" style={{ flexDirection: "column" }}>
          <picture style={{ width: "15rem", height: "15rem" }}>
            <img src={imageUrl ? imageUrl : medecin} alt="user" />
          </picture>

          <div className="btn_photo">
            <label htmlFor="photo">Ajouter une nouvelle photo</label>

            <input
              type="file"
              name="photo"
              id="photo"
              ref={photoRef}
              onChange={(e) => ajouterPhoto(e)}
            />
          </div>
          <button type="button" onClick={resetPhoto}>
            Reset
          </button>
        </div>
        <div className="input_section">
          <div className="input_conteneur">
            <label htmlFor="prenom">Nom du Produit</label>
            <input
              type="text"
              placeholder="Exemple : Couette"
              id="prenom"
              pattern="[A-Za-z,-_\s]{3,}"
              title="Le prenom doit contenir au moins 3 caractères alphabétiques."
              required
              ref={nomRef}
            />
          </div>
          <div className="input_conteneur">
            <label htmlFor="prenom">Quantité</label>
            <input
              type="text"
              placeholder="Exemple: 0"
              id="prenom"
              ref={quantiteRef}
              required
            />
          </div>
          <div className="btn" style={{ alignItems: "center" }}>
            <button type="submit" style={{ marginTop: "0" }}>
              Enregitrer
            </button>
            <span onClick={navigation}>Annuler</span>
          </div>
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
        <p> Voulez-vous confirmé cetta ajout? </p>
        <div className="repense">
          <button onClick={envoyerData}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </div>
  );
};

export default AjouterProduit;
