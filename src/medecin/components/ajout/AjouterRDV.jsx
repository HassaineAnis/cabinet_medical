import React, { useRef, useState, useContext } from "react";
import "../../../style/medecinStyle/ajout/ajoutconsult.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";
import { RechargeContext } from "../../../util/context/Context";

Modal.setAppElement("#root");

const AjouterRDV = (props) => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  const {openModal,closeModal,modalIsOpen} = useModal()

  const { setRecharge } = useContext(RechargeContext);
   
  const [motif, setMotif] = useState("");
  const formRef = useRef(null);
  const sexeRef = useRef(null);
  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const numeroTelRef = useRef(null)
  const adresseRef = useRef(null)
  const dateRef = useRef(null); 
  const ageRef = useRef(null);
  const typeAccouchementRef  = useRef(null)
  const typeCherurgieRef =useRef(null)
  

  const navigate = useNavigate();
  const navigation = () => {
    navigate("/medecin/rendez-vous");
  };

  

   
 
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };

  const enregitrer = async (e) => {
 closeModal()
    const data = {
      medecin: jeton.id,
      nom: nomRef.current.value,
      prenom: prenomRef.current.value,
      age: ageRef.current.value,
      adresse :adresseRef.current.value,
      numeroTel:numeroTelRef.current.value,
      date: dateRef.current.value,
      motif: motif,
       sexe:sexeRef.current.value,
       typeAccouchement : typeAccouchementRef.current? typeAccouchementRef.current.value : "",
       typeCherurgie : typeCherurgieRef.current? typeCherurgieRef.current.value : ""




       
     
       
    };
   

    try {
      const response = await fetch("http://localhost:3000/api/rendez-vous", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setRecharge(true);
        Notification.reussite("Rendez- vous ajouter avec succés.")
        formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        Notification.echec("Echec de lors de l'ajout du rendez_vous.")
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      Notification.echec("Echec de la requete.")

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

        <form
          onSubmit={(e) => {
            verificationData(e);
          }}
          ref={formRef}
        >
          <div className="formulaire_nom">
            <div className="input_container">
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

            <div className="input_container">
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

            <div className="input_container">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Exemple : 23"
                required
                ref={ageRef}
              />
            </div>
            <div className="input_container">
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
            <div className="input_container">
              <label htmlFor="numeroTel">Numéro de Téléphone</label>
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
            <div className="input_container">
              <label htmlFor="date">Date du rendez-vous</label>
              <input
                type="date"
                name="date"
                id="date"
                required 
                ref={dateRef}
              />
            </div>

            <div className="input_container">
              <label htmlFor="sexe">Sexe</label>
              <select name="sexe" id="sexe" required ref={sexeRef}>
                <option value=""></option>
                <option value="HOMME">Homme</option>
                <option value="FEMME">Femme</option>
              </select>
            </div>

            <div className="input_container">
              <label htmlFor="motif">Motif du rendez-vous</label>
              <select
                name="motif"
                id="motif"
                onChange={(e) => setMotif(e.target.value)}
                required
              >
                <option value=""></option>
                <option value="Consultation">Consultation</option>
                <option value="Chérurgie">Chérurgie</option>
                <option value="Accouchement">Accouchement</option>
              </select>
            </div>
          </div>

          {motif === "Accouchement" && (
            <div className="input_container">
              <label htmlFor="accouchement">Type d'Accouchement</label>
              <select name="accouchement" id="accouchement"  required ref={typeAccouchementRef}>
                <option value="Naturel">Naturel</option>
              </select>
            </div>
          )}

          {motif === "Chérurgie" && (
            <div className="input_container">
              <label htmlFor="cherurgie">Type de Chérurgie</label>
              <select name="cherurgie" id="cherurgie"  required ref={typeCherurgieRef}>
                <option value="">......</option>
                <option value="Esthétique">Esthétique</option>
              </select>
            </div>
          )}

          <div className="btn">
            <button>Enregitrer</button>
            <span onClick={navigation}>Annuler</span>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="custom_modal"
            style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
          >
            <p>  Confirmé l'enregistrement du rendez-vous? </p>
            <div className="repense">
              <button onClick={enregitrer}>OUI</button>
              <button onClick={closeModal}>NON</button>
            </div>
          </Modal>
        </form>
      </div>
    </>
  );
};

export default AjouterRDV;
