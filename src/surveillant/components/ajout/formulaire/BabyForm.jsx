import React, { useContext, useEffect, useRef } from "react";
import { listeBaby } from "../../../../data/surveillant/ListeBaby";
import { SurveilleBabyContext } from "../../../../util/context/Context";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";
import { useNavigate } from "react-router-dom";

const BabyForm = ({ imprimer }) => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const controleRef = useRef(null);

  const dateRef = useRef(null);
  const observationRef = useRef(null);
  const {
    setAfficher,
    afficherFiche,
    nne,
    SetNne,
    date,
    setDate,
    heure,
    setHeure,
    sexe,
    setSexe,
    accouchement,
    setAccouchement,
    couveuse,
    setCouvveuse,
    nom,
    setNom,
    prenom,
    setPrenom,
    groupage,
    setGroupage,
    documentData,
    setDocumentData,
    antiD,
    setAntiD,
  } = useContext(SurveilleBabyContext);

  const verifierContole = () => {
    if (
      !observationRef.current.value ||
      observationRef.current.value.trim() === ""
    ) {
      return notification.echec("veuillez ajouter un observation.");
    }

    ajouterControle();
  };
  const ajouterControle = () => {
    const controleExiste = documentData.findIndex(
      (obj) => obj.titre === controleRef.current.value
    );
    if (controleExiste !== -1) {
      const updateControle = documentData.map((obj, index) => {
        if (index === controleExiste) {
          return {
            ...obj,
            ...(dateRef.current.value === "jour1" && {
              jour1: observationRef.current.value,
            }),
            ...(dateRef.current.value === "jour2" && {
              jour2: observationRef.current.value,
            }),
            ...(dateRef.current.value === "jour3" && {
              jour3: observationRef.current.value,
            }),
          };
        }

        return obj;
      });
      setDocumentData(updateControle);
    } else {
      const newDocument = {
        titre: controleRef.current.value,
        ...(dateRef.current.value === "jour1" && {
          jour1: observationRef.current.value,
        }),
        ...(dateRef.current.value === "jour2" && {
          jour2: observationRef.current.value,
        }),
        ...(dateRef.current.value === "jour3" && {
          jour3: observationRef.current.value,
        }),
      };
      setDocumentData([...documentData, newDocument]);
    }
  };
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      nom: nom.trimStart(),
      prenom: prenom.trimStart(),
      nne: nne.trimStart(),
      antiD: antiD,
      accouchement: accouchement,
      sexe: sexe,
      couveuse: couveuse.trimStart(),

      groupage: groupage,
      date: date,
      heure: heure,

      documentData: documentData,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/bebe/surveillance",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite("Fiche surveillance ajouter avec succés.");
        // formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'ajout de la fiche.");
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
      <form onSubmit={verificationData}>
        <div
          className="partie1"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          }}
        >
          <div className="input_container">
            <label htmlFor="nom">Nom de a maman</label>
            <input
              type="text"
              id="nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="prenom">Prénom da la maman</label>
            <input
              type="text"
              id="prenom"
              onChange={(e) => setPrenom(e.target.value)}
              value={prenom}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="nne">NNE</label>
            <input
              type="text"
              id="nne"
              onChange={(e) => SetNne(e.target.value)}
              value={nne}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="sexe">Sexe</label>
            <select
              name="sexe"
              id="sexe"
              onChange={(e) => setSexe(e.target.value)}
              value={sexe}
              required
            >
              <option value="">---choisir sexe---</option>
              <option value="Fille">Fille</option>
              <option value="Garçon">Garçon</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="accouchement">Nature Accouchement</label>
            <input
              type="text"
              id="accouchement"
              onChange={(e) => setAccouchement(e.target.value)}
              value={accouchement}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="antiD">Anti-D</label>
            <select
              name="antiD"
              id="antiD"
              onChange={(e) => setAntiD(e.target.value)}
              value={antiD}
              required
            >
              <option value="">---choisi anti-D---</option>
              <option value="anti-d1">Anti-D1</option>
              <option value="anti-d2">Anti-D2</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="couveuse">Couveuse</label>
            <input
              type="text"
              id="couveuse"
              onChange={(e) => setCouvveuse(e.target.value)}
              value={couveuse}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="groupage">Groupage</label>
            <select
              type="text"
              id="groupage"
              onChange={(e) => setGroupage(e.target.value)}
              value={groupage}
              required
            >
              <option value="">---choisir---</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="date">Date </label>
            <input
              type="date"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="heure">Heure</label>
            <input
              type="time"
              id="heure"
              onChange={(e) => setHeure(e.target.value)}
              value={heure}
              required
            />
          </div>
        </div>
        <div className="partie1">
          <div className="input_container">
            <label htmlFor="controle">Controle</label>
            <select name="controle" id="controle" ref={controleRef}>
              {listeBaby.map((element, index) => (
                <option key={index} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="input_container">
            <label htmlFor="datec">Date Controle</label>
            <select name="datec" id="datec" ref={dateRef}>
              <option value="jour1">Jour 1</option>
              <option value="jour2">Jour 2</option>
              <option value="jour3">Jour 3</option>
            </select>
          </div>
        </div>
        <div className="partie1">
          <div className="input_container">
            <label htmlFor="remarque">Observation</label>
            <input type="text" id="remarque" ref={observationRef} required />
          </div>
        </div>

        <div className="btn">
          <div className="btn_save">
            <button>Enregisté</button>
            <span onClick={navigation}>Annuler</span>
          </div>

          {!afficherFiche ? (
            <span onClick={verifierContole}>Ajouter</span>
          ) : (
            <span onClick={imprimer}>Imprimer</span>
          )}

          <span onClick={(e) => setAfficher(!afficherFiche)}>
            {afficherFiche ? "Cacher Fiche" : "Voir Fiche"}
          </span>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <p> Confirmé l'enregistrement de la fiche? </p>
        <div className="repense">
          <button onClick={enregitrer}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </>
  );
};
export default BabyForm;
