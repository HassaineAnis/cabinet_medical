import React, { useContext, useEffect } from "react";
import { listeMedicaments } from "../../../../data/surveillant/ListeMedicaments";
import { NavetteContext } from "../../../../util/context/Context";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";
import { useNavigate } from "react-router-dom";

const NavetteForm = ({ imprimer }) => {
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const { openModal, closeModal, modalIsOpen } = useModal();
  const {
    afficherFiche,
    setAfficherFiche,
    designation,
    setDesignation,
    nom,
    setNom,
    prenom,
    setPrenom,
    age,
    setAge,
    diagnostic,
    setDiagnostic,
    dateEntre,
    setdateEntre,
    dateSortie,
    setDateSortie,
    medicament,
    setMedicament,
    maternite,
    setMaternite,
    bloc,
    setBloc,
    hospital,
    setHospital,
  } = useContext(NavetteContext);
  useEffect(() => {
    return () => {
      setDesignation([]);
      setHospital(0);
      setBloc(0);
      setMedicament("");
      setMaternite(0);
    };
  }, []);
  const verifieAvantAjout = () => {
    if (nom === "") {
      return notification.echec("veillez montiné le nom du patient");
    }
    if (prenom === "") {
      return notification.echec("veillez montiné le prénom du patient");
    }
    if (age === "") {
      return notification.echec("veillez montiné le age du patient");
    }
    if (dateEntre === "") {
      return notification.echec("veillez montiné la date d'entée");
    }
    if (dateSortie === "") {
      return notification.echec("veillez montiné la date de sortie");
    }
    if (medicament === "") {
      return notification.echec("veillez montiné un Médicament");
    }
    AjouterMedicament();
  };

  const AjouterMedicament = () => {
    const medicamentExiste = designation.findIndex(
      (obj) => obj.medicament === medicament
    );
    if (medicamentExiste !== -1) {
      const updateDesignation = designation.map((obj, index) => {
        if (index === medicamentExiste) {
          return {
            ...obj,
            maternite: obj.maternite + maternite,
            bloc: obj.bloc + bloc,
            hospital: obj.hospital + hospital,
          };
        }
        return obj;
      });
      setDesignation(updateDesignation);
    } else {
      const newDesignation = {
        medicament: medicament,
        maternite: parseInt(maternite),
        bloc: parseInt(bloc),
        hospital: parseInt(hospital),
      };
      setDesignation([...designation, newDesignation]);
    }
  };
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      dateEntre: dateEntre,
      dateSortie: dateSortie,
      nom: nom.trimStart(),
      prenom: prenom.trimStart(),
      age: age.trimStart(),
      diagnostic: diagnostic.trimStart(),
      documentData: designation,
    };

    try {
      const response = await fetch("http://localhost:3000/api/navette", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("Fiche Navette ajouter avec succés.");
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
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              id="nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="prenom">Prénom</label>
            <input
              type="text"
              id="prenom"
              onChange={(e) => setPrenom(e.target.value)}
              value={prenom}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="diagno">diagnostic</label>
            <input
              type="text"
              id="diagno"
              onChange={(e) => setDiagnostic(e.target.value)}
              value={diagnostic}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="dateEntre">Date D'entrée</label>
            <input
              type="date"
              id="dateEntre"
              onChange={(e) => setdateEntre(e.target.value)}
              value={dateEntre}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="dateSortie">Date De Sortie</label>
            <input
              type="date"
              id="dateSortie"
              onChange={(e) => setDateSortie(e.target.value)}
              value={dateSortie}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="medicament">Médicament</label>
            <select
              name="medicament"
              id="medicament"
              required
              onChange={(e) => setMedicament(e.target.value)}
              value={medicament}
            >
              <option value="">---choix Médicament---</option>
              {listeMedicaments.map((med, index) => (
                <option key={index} value={med}>
                  {med}
                </option>
              ))}
            </select>
          </div>
          <div className="input_container">
            <label htmlFor="maternite">Matérnité</label>
            <input
              type="number"
              id="maternite"
              onChange={(e) => setMaternite(parseInt(e.target.value))}
              value={maternite}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="bloc">Bloc</label>
            <input
              type="number"
              id="bloc"
              onChange={(e) => setBloc(parseInt(e.target.value))}
              value={bloc}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="Hosp">Hospitalisation</label>
            <input
              type="number"
              id="hosp"
              onChange={(e) => setHospital(parseInt(e.target.value))}
              value={hospital}
              required
            />
          </div>
        </div>

        <div className="btn">
          <div className="btn_save">
            <button>Enregisté</button>
            <span onClick={navigation}>Annuler</span>
          </div>
          {!afficherFiche ? (
            <span onClick={verifieAvantAjout}>Ajouter</span>
          ) : (
            <span onClick={imprimer}>Imprimer</span>
          )}
          <span onClick={(e) => setAfficherFiche(!afficherFiche)}>
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
export default NavetteForm;
