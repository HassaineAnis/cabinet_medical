import React, { useEffect, useRef, useState } from "react";
import "../../../style/adminStyle/ajout/ajoutUser.css";
import adminPhoto from "../../../assets/avatarH.png";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";

import { ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

const ProfilUsers = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const [fetchData, setFetch] = useState([]);
  const [erreur, setErreur] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/profile/${id}`
        );

        const users = await response.json();

        setFetch(users);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);
  console.log(fetchData);

  const navigate = useNavigate();
  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const [dateNaissance, setDateNaissance] = useState(null);
  const sexeRef = useRef(null);
  const dateRef = useRef(null);
  const numeroTelRef = useRef(null);
  const numeroSecurite = useRef(null);
  const passwordRef = useRef(null);
  const adresseRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const photoRef = useRef("");
  const formulaireRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

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
    const tabInfo = { ...fetchData };
    tabInfo.photo = "";
    setFetch(tabInfo);
  };

  const navigation = () => {
    navigate(-1);
  };

  const verifierData = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== fetchData.password) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return Notification.echec("Les mots de passe ne correspondent pas!");
      }
    } else {
      openModal();
    }
  };

  const modifierProfile = async (e) => {
    closeModal();
    //formater les donnees avant envoie
    const formaData = new FormData();

    if (photoRef.current.files[0]) {
      formaData.append("photo", photoRef.current.files[0]);
    } else {
      formaData.append("photo", fetchData.photo);
    }

    formaData.append("nom", nomRef.current.value.toUpperCase());
    formaData.append("prenom", prenomRef.current.value.toUpperCase());
    formaData.append("dateNaissance", dateRef.current.value);
    formaData.append("adresse", adresseRef.current.value);
    formaData.append("sexe", sexeRef.current.value);
    formaData.append("numeroTel", numeroTelRef.current.value);
    formaData.append(
      "numeroSecurite",
      parseInt(numeroSecurite.current.value, 10)
    );
    formaData.append("password", passwordRef.current.value);

    formaData.append("role", fetchData.role);

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        body: formaData,
      });

      if (response.ok) {
        Notification.reussite("Profile modifier avec succès.");
        //  formulaireRef.current.reset();
      } else {
        const erreurData = await response.json();
        Notification.echec(erreurData.error);

        console.error(
          "Une erreur s'est produite lors de la mise à jour du profil. Veuillez réessayer."
        );
      }
    } catch (error) {
      Notification.echec(
        "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
      );
    }
  };

  const afficherPhoto = () => {
    if (fetchData.photo === "") {
      return adminPhoto;
    } else {
      return fetchData.photo;
    }
  };

  if (erreur) {
    return <div className="container_form">Erreur de chargement</div>;
  }

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="container_form">
        {isLoading ? (
          <div> chargement</div>
        ) : (
          <>
            <h2>Modifier les informations de l'utilisateur</h2>
            <hr />
            <form onSubmit={verifierData} ref={formulaireRef}>
              <div className="image_upload">
                <picture>
                  <img src={imageUrl ? imageUrl : afficherPhoto()} alt="user" />
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
                    defaultValue={fetchData.nom}
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
                    defaultValue={fetchData.prenom}
                    id="prenom"
                    ref={prenomRef}
                    pattern="[A-Za-z,-_\s]{3,}"
                    title="Le prenom doit contenir au moins 3 caractères alphabétiques."
                    required
                  />
                </div>
                <div className="input_conteneur">
                  <label htmlFor="date">Date De Naissance</label>
                  <div className="dates">
                    <input
                      type="date"
                      id="date"
                      onChange={(e) => setDateNaissance(e.target.value)}
                    />
                    <input
                      type="text"
                      id="dateAffiche"
                      readOnly={true}
                      ref={dateRef}
                      value={
                        dateNaissance
                          ? new Date(dateNaissance).toLocaleDateString()
                          : fetchData.user &&
                            new Date(
                              fetchData.user.dateNaissance
                            ).toLocaleDateString()
                      }
                    />
                  </div>
                </div>

                <div className="input_conteneur">
                  <label htmlFor="adresse">Adresse</label>
                  <input
                    type="text"
                    id="adresse"
                    defaultValue={fetchData.adresse}
                    ref={adresseRef}
                    pattern="[A-Za-z,-_\s]{3,}"
                    title="L'adresse doit contenir au moins 4 caractères alphabétiques."
                    placeholder="Ex : Abarane, Tirmitine, Tizi-Ouzou"
                    required
                  />
                </div>

                <div className="input_conteneur">
                  <label htmlFor="sexe">Sexe</label>
                  <select
                    name="sexe"
                    id="sexe"
                    defaultValue={fetchData.sexe}
                    ref={sexeRef}
                    required
                  >
                    <option value="HOMME">HOMME</option>
                    <option value="FEMME">FEMME</option>
                  </select>
                </div>

                <div className="input_conteneur">
                  <label htmlFor="numeroTel">N° Téléphone</label>
                  <input
                    type="text"
                    defaultValue={fetchData.numeroTel}
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
                    defaultValue={fetchData.numeroSecurite}
                    ref={numeroSecurite}
                    placeholder="Numéro de sécurité sociale (ex : 12 3456 7890 12)"
                    required
                  />
                </div>

                <div className="input_conteneur">
                  <label htmlFor="password"> New Password</label>
                  <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    defaultValue={fetchData.password}
                    placeholder="Saisissez votre mot de passe"
                    pattern="^(?=.*\d)(?=.*[a-z]).{5,}$"
                    title="Le mot de passe doit contenir au moins 5 caractères, dont au moins une lettre minuscule et un chiffre."
                    required
                  />
                </div>
                <div className="input_conteneur">
                  <label htmlFor="confirmePassword">Comfirme Password</label>
                  <input
                    placeholder="Confirmez votre mot de passe"
                    type="password"
                    id="confirmePassword"
                    ref={confirmPasswordRef}
                  />
                </div>
              </div>
              <div className="btn">
                <button type="submit">Enregitrer</button>

                <span onClick={navigation}>Annuler</span>
              </div>
            </form>
          </>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "2",
          },
        }}
      >
        <p> Voulez-vous mètre a jour ce profil ?</p>
        <div className="repense">
          <button onClick={modifierProfile}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </>
  );
};

export default ProfilUsers;
