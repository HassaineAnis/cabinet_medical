import React, { useRef, useState } from "react";
import "../../../style/adminStyle/ajout/ajoutUser.css";
import adminPhoto from "../../../assets/admin.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";

import { ToastContainer } from "react-toastify";
import notification from "../../../util/Notifiation";

Modal.setAppElement("#root");
const AjouterEmploye = ({ specialite }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();
  const nomRef = useRef(null);
  const prenomRef = useRef(null);

  const sexeRef = useRef(null);
  const dateRef = useRef(null);
  const numeroTelRef = useRef(null);
  const numeroSecurite = useRef(null);

  const adresseRef = useRef(null);

  const specialiteRef = useRef("");
  const photoRef = useRef("");
  const formulaireRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const dateEntre = useRef(null);

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
    formaData.append("nom", nomRef.current.value.toUpperCase());
    formaData.append("prenom", prenomRef.current.value.toUpperCase());
    formaData.append("dateNaissance", dateRef.current.value);
    formaData.append("adresse", adresseRef.current.value);
    formaData.append("dateEntre", dateEntre.current.value);
    formaData.append("sexe", sexeRef.current.value);
    formaData.append("numeroTel", numeroTelRef.current.value);
    formaData.append(
      "numeroSecurite",
      parseInt(numeroSecurite.current.value, 10)
    );

    formaData.append("specialite", specialiteRef.current.value);

    try {
      const response = await fetch("http://localhost:3000/api/personnel", {
        method: "POST",
        body: formaData,
      });

      if (response.ok) {
        Notification.reussite(`Employé ajouté avec succès`);
        formulaireRef.current.reset();
      } else {
        const erreurData = await response.json();
        notification.echec(erreurData.error);

        console.error(
          "Une erreur s'est produite lors de l'enregistrement du médecin. Veuillez réessayer."
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
      <h2>Informations sur l'employe</h2>
      <hr />
      <form onSubmit={verifierData} ref={formulaireRef}>
        <div className="image_upload">
          <picture>
            <img src={imageUrl ? imageUrl : adminPhoto} alt="user" />
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
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              placeholder="Exemple : Dupont"
              ref={nomRef}
              pattern="[A-Za-z,-_\s]{3,}"
              title="Le nom doit contenir au moins 3 caractères alphabétiques."
              required
            />
          </div>
          <div className="input_conteneur">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              placeholder="Exemple : Jean"
              id="prenom"
              ref={prenomRef}
              pattern="[A-Za-z,-_\s]{3,}"
              title="Le prenom doit contenir au moins 3 caractères alphabétiques."
              required
            />
          </div>
          <div className="input_conteneur">
            <label htmlFor="date">Date De Naissance</label>
            <input type="date" id="date" ref={dateRef} required />
          </div>
          <div className="input_conteneur">
            <label htmlFor="dateE">Date De Entrée</label>
            <input type="date" id="dateE" ref={dateEntre} required />
          </div>

          <div className="input_conteneur">
            <label htmlFor="adresse">Adresse</label>
            <input
              type="text"
              id="adresse"
              ref={adresseRef}
              pattern="[A-Za-z,-_\s]{3,}"
              title="L'adresse doit contenir au moins 4 caractères alphabétiques."
              placeholder="Ex : Abarane, Tirmitine, Tizi-Ouzou"
              required
            />
          </div>

          <div className="input_conteneur">
            <label htmlFor="specialite">Sexe</label>
            <select name="specialite" id="specialite" ref={sexeRef} required>
              <option value=""></option>
              <option value="HOMME">HOMME</option>
              <option value="FEMME">FEMME</option>
            </select>
          </div>

          <div className="input_conteneur">
            <label htmlFor="numeroTel">N° Téléphone</label>
            <input
              type="text"
              id="numeroTel"
              ref={numeroTelRef}
              pattern="^(05|06|07)[0-9]{8}$"
              title="Le numéro de téléphone doit être au format algérien."
              required
              placeholder="Ex: 05 XX XX XX XX"
            />
          </div>

          <div className="input_conteneur">
            <label htmlFor="numeroSecurite">N° Sécurité Sociale</label>
            <input
              type="text"
              id="numeroSecurite"
              ref={numeroSecurite}
              placeholder="Numéro de sécurité sociale (ex : 12 3456 7890 12)"
              required
            />
          </div>

          <div className="input_conteneur">
            <label htmlFor="specialite">Spécialité</label>
            <select
              name="specialite"
              id="specialite"
              ref={specialiteRef}
              required
            >
              {specialite.map((element, index) => (
                <option key={`${index}-${element}`} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="btn">
          <button type="submit">Enregitrer</button>
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
          <span onClick={navigation}>Annuler</span>
        </div>
      </form>
    </div>
  );
};

export default AjouterEmploye;
