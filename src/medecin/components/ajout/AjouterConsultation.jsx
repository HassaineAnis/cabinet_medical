import React, { useRef, useState,useContext } from "react";
import "../../../style/medecinStyle/ajout/ajoutconsult.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { RechargeContext } from "../../../util/context/Context";

Modal.setAppElement("#root");

const AjouterConsultation = () => {

    const {setRecharge} = useContext(RechargeContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);

const formRef = useRef(null)
  const montantRef = useRef(null);
  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const [sexe, setSexe] = useState("");
  const dateRef = useRef(null);
  const ageRef = useRef(null);
  const diagnosticRef = useRef(null);

  const handleRadioChange = (event) => {
    setSexe(event.target.value);
  };

  const navigate = useNavigate();
  const navigation = () => {
    navigate("/medecin/consultation");
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const verificationData = (e) => {
    e.preventDefault();
  
              openModal();
   
  };

  const enregitrer = async (e) => {
    e.preventDefault();
    const data = {
        nom: nomRef.current.value,
        prenom: prenomRef.current.value,
        age: ageRef.current.value,
        sexe: sexe,
        date: dateRef.current.value, 
        montant: montantRef.current.value,   
        diagnostic: diagnosticRef.current.value
         }

    try {
        const response = await fetch("http://localhost:3000/api/consultation", {
          method: "POST",
          body: JSON.stringify(data)  ,
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          notificationReussite("Enregistrement réussi");
          setRecharge(true)
          formRef.current.reset();
        } else {
          notificationEchec("Echec enregistrement");
          console.error("Erreur lors de la requête");
          // Gérer les erreurs (afficher un message d'erreur, etc.)
        }
      } catch (error) {
        console.error(error);
        notificationEchec("Echec de la requete");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }

  };
  const notificationEchec = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    closeModal();
  };

  const notificationReussite = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    closeModal();
    
  };

  return (
    <> 
    <ToastContainer />
    <div className="ajouterConsult">
       
      <div className="ajouterConsult_entete">
        <h2>Ajouter une nouvelle consutation</h2>
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
              name="nom"
              id="nom"
              placeholder="Nom"
              required={true}
              ref={nomRef}
            />
          </div>

          <div className="input_container">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prénom"
              required={true}
              ref={prenomRef}
            />
          </div>

          <div className="input_container">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              required={true}
              ref={ageRef}
            />
          </div>

          <div className="input_container">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              required={true}
              ref={dateRef}
            />
          </div>
        </div>

        <div className="input_container">
          <label htmlFor="montant">Montant</label>
          <input
            type="text"
            name="montant"
            id="montant"
            placeholder="0 DA"
            required={true}
            ref={montantRef}
          />
        </div>

        <div className="input_container">
          <label htmlFor="diagnostic">Diagnostic</label>
          <textarea
            style={{ resize: "none" }}
            name="diagnostic"
            id="diagnostic"
            placeholder="Diagnostic...."
            required={true}
            ref={diagnosticRef}
          />
        </div>
        <div className="input_container_radio">
          <span>Sexe : </span>
          <input
            type="radio"
            name="sexe"
            id="homme"
            value="Homme"
            onChange={handleRadioChange}
          />
          <label htmlFor="homme">Homme</label>
          <input
            type="radio"
            name="sexe"
            id="femme"
            value="Femme"
            onChange={handleRadioChange}
          />
          <label htmlFor="sexe">Femme</label>
        </div>
        <div className="btn">
          <button>Enregitrer</button>
          <button
            onClick={(e) => {
              navigation();
            }}
          >
            Annuler
          </button>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
          >
            <p> Etes vous sur des ces informations? </p>
            <div className="repense">
              <button onClick={enregitrer}>OUI</button>
              <button onClick={closeModal}>NON</button>
            </div>
          </Modal>
      </form>
    </div>
    </>);
};

export default AjouterConsultation;
