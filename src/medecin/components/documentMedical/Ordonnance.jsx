import React from "react";
import logo from "../../../assets/logo (1).png";
import "../../../style/medecinStyle/documentMedical/ordonnance.css";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../style/loader/loader.css";
import html2canvas from "html2canvas";
import { DocumentContext } from "../../../util/context/Context";

const Ordonnance = () => {
  const { documents, setDocuments } = useContext(DocumentContext);

  const componentRef = React.useRef();
  const [traitement, setTraitement] = useState([]);
  const [inputTraitement, setInput] = useState("");
  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();

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

  const ajouterTraitement = () => {
    const trimmedInput = inputTraitement.trim();
    if (inputTraitement && trimmedInput !== "") {
      setTraitement([...traitement, inputTraitement]);
      setInput("");
    }
  };
  const supprimerTraitement = (element, index) => {
    const table = [...traitement];
    table.splice(index, 1);
    if (table.length === 0) {
      setTraitement([]);
    } else {
      setTraitement(table);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const envoie = (e) => {
    e.preventDefault();
  };
  //----------------------------------- conversion en image------------------------------------------------//
  function cleanBase64String(base64String) {
    // Supprimer les entêtes "data:image/jpeg;base64," ou "data:image/png;base64," si présents
    const base64HeaderRegex = /^data:(image\/(jpeg|png));base64,/;
    const cleanedBase64String = base64String.replace(base64HeaderRegex, "");

    // Supprimer tous les caractères non valides
    const validBase64Characters = /^[A-Za-z0-9+/=]+$/;
    if (!validBase64Characters.test(cleanedBase64String)) {
      throw new Error(
        "Chaîne Base64 invalide : caractères non valides détectés."
      );
    }

    return cleanedBase64String;
  }

  function base64ToFile(base64String, filename, mimeType) {
    const byteCharacters = atob(base64String); // Convertit la chaîne Base64 en caractères binaires
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, filename, { type: mimeType });
    return file;
  }

  const convertPdf = () => {
    const content = componentRef.current;
    const width = content.scrollWidth;
    const height = content.scrollHeight;

    html2canvas(content, { width, height }).then((canvas) => {
      const imageBase64 = canvas.toDataURL("image/jpeg");
      const cleanedImageBase64 = cleanBase64String(imageBase64);

      const imageFile = base64ToFile(
        cleanedImageBase64,
        "ordonnace",
        "image/jpeg"
      );

      const documentData = {
        titre: "ordonnace",
        image: imageFile,
      };

      // Mettre à jour le state pour afficher l'image capturée
      setDocuments([...documents, documentData]);
      navigate(-1);
    });
  };
  //---------------------------------------------*****---------------------------------------//

  const saveDocument = () => {
    const documentData = {
      titre: "ordonnance",
      donnes: [...traitement],
    };
    setDocuments([...documents, documentData]);
    navigate(-1);
  };

  if (erreur) {
    return <div className="ordonnance">Erreur de chargement.</div>;
  }

  return (
    <div className="ordonnance">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="ord_c">
            <div className="ordonnance_Container" ref={componentRef}>
              <div className="section1">
                <div className="entete">
                  <div className="entete_text">
                    <h3>Etablissement Hospitalier Privé La Colombe</h3>
                    <hr />
                    <h4>
                      Le progrès et l'humanisme au service de la santé
                      <br />
                      المؤسسة الإستشفائية الخاصة لاكولومب
                      <br />
                      التقدم و الإنسانية في خدمة الصحة
                    </h4>
                  </div>
                  <img src={logo} alt="Logo Administration" />
                </div>
                <div className="section1_info">
                  <div className="info">
                    <p>
                      <strong>Nom :</strong> <span>{patient.nom}</span>
                    </p>
                    <p>
                      <strong>Prénom :</strong> <span>{patient.prenom}</span>
                    </p>
                    <p>
                      <strong>Age :</strong> <span>{patient.age} ans</span>
                    </p>
                  </div>

                  <div className="date">
                    <p>
                      <strong> DBK, le :</strong>{" "}
                      <span>{new Date().toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>

                <div className="section1_titre">
                  <h3>وصفة طبية </h3>

                  <h3>Ordonnace</h3>
                </div>

                <div className="traitement">
                  <ul>
                    {traitement.map((element, index) => (
                      <li key={`${element}-${index}`}>{element}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="section2">
                <hr />
                <p>
                  Etablissement Hospitalier Privé la Colombe Touares II Draa Ben
                  Khedda <br />
                  15100 Tizi-Ouzou
                  <br />
                  Mobile: 0550 96 95 65 - Tél/Fax: 026 43 32 22 / 026 43 33 22{" "}
                </p>
              </div>
            </div>
          </div>

          <form className="no-print" onSubmit={envoie}>
            <div className="ajout_traitement">
              <div className="input_container">
                <label htmlFor="traitement">Traitemants:</label>
                <textarea
                  id="traitement"
                  value={inputTraitement}
                  onChange={(e) => setInput(e.target.value)}
                ></textarea>
              </div>
              <span onClick={ajouterTraitement}>Ajouter</span>
            </div>
            <div className="liste_traitement">
              <ul>
                {traitement.map((element, index) => (
                  <li key={`${element}-${index}`}>
                    <div>
                      {element}
                      <svg
                        onClick={(e) => supprimerTraitement(element, index)}
                        xmlns="http://www.w3.org/2000/svg"
                        height={25}
                        width={25}
                        viewBox="0 0 448 512"
                      >
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {traitement.length !== 0 && (
              <div className="btn">
                <div className="btn_1">
                  <button onClick={saveDocument}>Enregistré</button>
                  <button
                    onClick={(e) => {
                      navigate(-1);
                    }}
                  >
                    Annuler
                  </button>
                </div>
                <div className="print" onClick={handlePrint}>
                  Imprimer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={30}
                    width={30}
                    viewBox="0 0 512 512"
                    fill="#fff"
                  >
                    <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Ordonnance;
