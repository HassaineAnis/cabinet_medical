import React, { useRef, useContext, useState, useEffect } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import { listeMedicaments } from "../../../data/surveillant/ListeMedicaments";
import { ToastContainer } from "react-toastify";

import { NavetteContext } from "../../../util/context/Context";
import { useReactToPrint } from "react-to-print";
import Navette from "../doc/Navette";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
import { format } from "date-fns";
import Modal from "react-modal";

const ModifierNavette = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
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
  const { id } = useParams();
  const supprimerMedicament = (medicament) => {
    const updatedDesignation = designation.filter(
      (obj) => obj.medicament !== medicament
    );
    setDesignation(updatedDesignation);
  };
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/navette/${id}`);

        const navette = await response.json();
        setDesignation(navette.documentData);
        setNom(navette.nom);
        setPrenom(navette.prenom);
        setAge(navette.age);
        setDateSortie(format(new Date(navette.dateSortie), "yyyy-MM-dd"));
        setdateEntre(format(new Date(navette.dateEntre), "yyyy-MM-dd"));
        setDiagnostic(navette.diagnostic);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRdv();
    return () => {
      setDesignation([]);
      setHospital(0);
      setBloc(0);
      setMedicament("");
      setMaternite(0);
      setNom("");
      setPrenom("");
      setAge("");
      setDateSortie("");
      setdateEntre("");
      setDiagnostic("");
    };
  }, [id]);
  const verifieAvantAjout = () => {
    if (nom === "") {
      return notification.echec("veillez montioné le nom du patient");
    }
    if (prenom === "") {
      return notification.echec("veillez montioné le prénom du patient");
    }
    if (age === "") {
      return notification.echec("veillez montioné le age du patient");
    }
    if (dateEntre === "") {
      return notification.echec("veillez montioné la date d'entée");
    }
    if (dateSortie === "") {
      return notification.echec("veillez montioné la date de sortie");
    }
    if (medicament === "") {
      return notification.echec("veillez montioné un Médicament");
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
      const response = await fetch(`http://localhost:3000/api/navette/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("Fiche Navette modifier avec succés.");
        // formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de la modification de la fiche.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };

  if (erreur) {
    return <div className="intervention"> Erreur de chargement...</div>;
  }

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="intervention">
          {afficherFiche ? (
            <div className="section1">
              <Navette reference={composantImprimable} />
            </div>
          ) : (
            <div className="section1">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Medicament:</th>
                    <th style={{ textAlign: "left" }}>Matérnité:</th>
                    <th style={{ textAlign: "left" }}>Bloc:</th>
                    <th style={{ textAlign: "left" }}>Hospitalisation:</th>
                  </tr>
                </thead>
                <tbody>
                  {designation.map((element, index) => (
                    <tr key={index} style={{ animation: "table 200ms ease" }}>
                      <td className="point">{element.medicament}</td>
                      <td>{element.maternite}</td>
                      <td>{element.bloc}</td>
                      <td>{element.hospital}</td>
                      <td>
                        {" "}
                        <svg
                          style={{ cursor: "pointer" }}
                          onClick={(e) =>
                            supprimerMedicament(element.medicament)
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="#637381"
                          viewBox="0 0 512 512"
                        >
                          {" "}
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="formulaire" style={{ alignSelf: "flex-start" }}>
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
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="bloc">Bloc</label>
                  <input
                    type="number"
                    id="bloc"
                    onChange={(e) => setBloc(parseInt(e.target.value))}
                    value={bloc}
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="Hosp">Hospitalisation</label>
                  <input
                    type="number"
                    id="hosp"
                    onChange={(e) => setHospital(parseInt(e.target.value))}
                    value={hospital}
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
                  <span onClick={handlePrint}>Imprimer</span>
                )}
                <span onClick={(e) => setAfficherFiche(!afficherFiche)}>
                  {afficherFiche ? "Cacher Fiche" : "Voir Fiche"}
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <p> Confirmé la modification de la fiche? </p>
        <div className="repense">
          <button onClick={enregitrer}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </>
  );
};

export default ModifierNavette;
