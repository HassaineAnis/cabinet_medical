import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useReactToPrint } from "react-to-print";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
import { ToastContainer } from "react-toastify";

const AjouterIntervention = () => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  const { modalIsOpen, openModal, closeModal } = useModal();
  //const [imprimable, setImprimable] = useState(false);
  const componentRef = React.useRef();
  const [protocole, setProtocole] = useState("");
  const [pr, setPr] = useState("");
  const [date, setDate] = useState("");
  const [aide, setAide] = useState("");
  const [bloc, setBloc] = useState("");
  const [anesthesiste, setAnesthesiste] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [intervention, setIntervention] = useState("");
  const [observation, setObservation] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState([]);
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/Patient/details/${id}`
        );

        const patient = await response.json();

        setPatient(patient);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const verifierData = (e) => {
    e.preventDefault();

    openModal();
  };
  const envoyerData = async () => {
    closeModal();
    const data = {
      medecin: jeton.id,
      patient: patient._id,
      protocole: protocole,
      pr: pr,
      date: date,
      aide: aide,
      bloc: bloc,
      anesthesiste: anesthesiste,
      diagnosticLesionnel: diagnostic,
      interventionPratique: intervention,
      observation: observation,
      typeIntervention: "Chirurgie",
    };
    try {
      const response = await fetch("http://localhost:3000/api/intervention", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("Intervention ajouter avec succés.");
        // formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'ajout de l'intervention.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };

  const handleDownloadExcel = async () => {
    const response = await fetch(process.env.PUBLIC_URL + "/Classeur1.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Remplir les données dans le modèle Excel
    //worksheet["C3"] = "hassaine";
    //worksheet["C4"].v = "anis";
    // worksheet["C6"].v = "23";
    XLSX.utils.sheet_add_json(worksheet, [{ C3: "hassaine" }], {
      skipHeader: true,
      origin: "C3",
    });

    XLSX.utils.sheet_add_json(worksheet, [{ C3: "anis" }], {
      skipHeader: true,
      origin: "C4",
    });
    XLSX.utils.sheet_add_json(worksheet, [{ C3: "23" }], {
      skipHeader: true,
      origin: "C6",
    });

    // Générer le fichier Excel rempli

    // Créer un nouveau classeur avec les données remplies
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, sheetName);

    // Générer le fichier Excel rempli
    XLSX.writeFile(newWorkbook, "fichier_rempli.xlsx");
  };

  return (
    <div className="intervention">
      <ToastContainer />
      <div className="section1">
        <div className="section1_container" ref={componentRef}>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Chirurgien</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="cellule_patient">
                    <p>
                      <strong>Nom :</strong>{" "}
                      <span>{patient && patient.nom}</span>
                    </p>
                    <p>
                      <strong>Prénom :</strong>{" "}
                      <span>{patient && patient.prenom}</span>
                    </p>
                    <p>
                      <strong> Protocole N°:</strong> <span>{protocole}</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="cellule_patient">
                    {" "}
                    <p>
                      <strong>Pr : </strong>
                      <span>{pr}</span>
                    </p>
                    <p>
                      <strong>Date :</strong>
                      <span>{date && new Date(date).toLocaleDateString()}</span>
                    </p>
                    <p>
                      <strong> Opérateur :</strong>{" "}
                      <span>{`${jeton.nom} ${jeton.prenom}`}</span>
                    </p>
                    <p>
                      <strong>Aides :</strong> <span>{aide}</span>
                    </p>
                    <p>
                      <strong>Bloc :</strong> <span>{bloc}</span>
                    </p>
                    <p>
                      <strong>Anesthésiste :</strong>{" "}
                      <span>{anesthesiste}</span>
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>
              <strong>Diagnostique lésionnel : </strong>
              <span>{diagnostic} </span>
            </p>
            <p>
              <strong>Intervention pratiquée : </strong>
              <span>{intervention} </span>
            </p>
          </div>
          <div className="observation">
            <strong>Observation : </strong>
            <p>{observation}</p>
          </div>
        </div>
      </div>
      <div className="formulaire">
        <form onSubmit={verifierData}>
          <div className="partie1">
            <div className="input_container">
              <label htmlFor="protocol">Protoclo N°</label>
              <input
                type="text"
                onChange={(e) => setProtocole(e.target.value)}
                value={protocole}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="pr">Pr</label>
              <input
                type="text"
                onChange={(e) => setPr(e.target.value)}
                value={pr}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="aide">Aides</label>
              <input
                type="text"
                onChange={(e) => setAide(e.target.value)}
                value={aide}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="bloc">Bloc</label>
              <input
                type="text"
                id="bloc"
                onChange={(e) => setBloc(e.target.value)}
                value={bloc}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="anestesiste">Anesthésiste</label>
              <input
                type="text"
                id="anestesiste"
                onChange={(e) => setAnesthesiste(e.target.value)}
                value={anesthesiste}
                required
              />
            </div>
          </div>
          <div className="partie2">
            <div className="input_container">
              <label htmlFor="protocol">Diagnostique lésionnel</label>
              <input
                type="text"
                id="protocol"
                onChange={(e) => setDiagnostic(e.target.value)}
                value={diagnostic}
                required
              />
            </div>{" "}
            <div className="input_container">
              <label htmlFor="intervenetion">Intervention pratiquée</label>
              <input
                type="text"
                id="intervention"
                onChange={(e) => setIntervention(e.target.value)}
                value={intervention}
                required
              />
            </div>
          </div>
          <div className="input_container">
            <label htmlFor="observation">Observations</label>
            <textarea
              name="observation"
              id="observation"
              onChange={(e) => setObservation(e.target.value)}
              value={observation}
              required
            ></textarea>
          </div>
          <div className="btn">
            <div className="btn_save">
              <button>Enregisté</button>
              <span onClick={navigation}>Annuler</span>
            </div>
            <span onClick={handlePrint}>Imprimer</span>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
          },
        }}
      >
        <p> voullez vous enregistré ces informations?</p>
        <div className="repense">
          <button onClick={envoyerData}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </div>
  );
};

export default AjouterIntervention;
