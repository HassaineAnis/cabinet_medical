import React, { useState, useEffect, useRef } from "react";

import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { useReactToPrint } from "react-to-print";
import { choiDocument } from "../../../util/fontion Utils/impression LaboAm/choiDoc";

const nombreElementPage = 6;

const TableBiochimie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const { modalIsOpen, openModal, closeModal } = useModal();

  const [filtreFiche, setFiche] = useState("hgpo");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/analyse/patient/${id}`
        );

        const { analyses, patient } = await response.json();
        analyses.sort((a, b) => new Date(a.date) - new Date(b.date));
        setPatient(patient);
        const analyseFilter = analyses.filter(
          (element) =>
            element.document.nom === filtreFiche &&
            element.typeAnalyse === "biochimie"
        );
        setTotalPages(Math.ceil(analyseFilter.length / nombreElementPage));
        setData(analyseFilter);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };

    fetchRdv();
  }, [id, filtreFiche]);

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }

  if (erreur) {
    <div className="consultation_table">Erreur de chargement...</div>;
  }
  const [currentDoc, setCurrentDoc] = useState({});
  const componentRef = useRef(null);

  const imprimerDoc = async (doc) => {
    await setCurrentDoc(doc);
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <h2>Liste des Analyse Biochimique</h2>{" "}
      <div className="consultation_table">
        <ToastContainer />
        {isLoading ? (
          <div style={{ alignSelf: "center" }} className="spinner"></div>
        ) : (
          <>
            <div
              className="doc_print"
              style={{ position: "absolute", top: "-1000%", opacity: "0" }}
            >
              {currentDoc &&
                choiDocument(
                  currentDoc.document && currentDoc.document.nom,
                  componentRef,
                  patient,
                  currentDoc.document && currentDoc.document.data,
                  currentDoc && currentDoc.date
                )}
            </div>
            <div className="consultation_table_btn">
              <Link
                to={`/laboAM/biochimie/ajouter/${filtreFiche}/${id}`}
                className="btn_ajout"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  width={25}
                  height={25}
                  fill="none"
                  stroke="#FFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Ajouter une analyse
              </Link>
              <div className="info_patient">
                <p>
                  <span>Nom:</span> <span>{patient && patient.nom}</span>
                </p>
                <p>
                  <span>Prénom:</span> <span>{patient && patient.prenom}</span>
                </p>
                <p>
                  <span>Sexe:</span> <span>{patient && patient.sexe}</span>
                </p>
                <p>
                  <span>Age:</span> <span>{patient && patient.age}</span>
                </p>
              </div>

              <select
                name="filtreFiche"
                id="filtreFiche"
                onChange={(e) => setFiche(e.target.value)}
                value={filtreFiche}
              >
                <option value="hgpo">HGPO</option>
                <option value="proteinurie">PROTEINURIE</option>
                <option value="fer serrique">FER SERRIQUE</option>
                <option value="crp">CRP</option>
                <option value="bilirubine">BILIRUBINE</option>
                <option value="calcuim">CALCUIM</option>
              </select>
            </div>

            <>
              <div className="consultation_table__content">
                <table className="table">
                  <thead>
                    <tr className="table_entete">
                      <td>Date</td>
                      <td>Sérvice</td>
                      {filtreFiche === "proteinurie" && (
                        <>
                          <td>Proteinurie</td>
                          <td>Diurese</td>
                        </>
                      )}
                      {filtreFiche === "calcuim" && (
                        <>
                          <td>Calcium</td>
                          <td>Phosphore</td>
                          <td>Magnesium</td>

                          <td>Fer Serrique</td>
                        </>
                      )}
                      {filtreFiche === "bilirubine" && (
                        <>
                          <td>Bilirubine T(sang)</td>
                          <td>Bilirubine D(sang)</td>
                          <td>Bilirubine T(urée)</td>
                          <td>Bilirubine D(urée)</td>
                          <td>RAI</td>
                          <td>Test De Coombs</td>
                          <td>CRP</td>
                          <td>Calcium</td>
                        </>
                      )}
                      {filtreFiche === "crp" && (
                        <>
                          <td>CRP</td>
                        </>
                      )}
                      {filtreFiche === "fer serrique" && (
                        <>
                          <td>Fer Sérique</td>
                        </>
                      )}
                      {filtreFiche === "hgpo" && (
                        <>
                          <td>Dosage1</td>
                          <td>Dosage2</td>
                          <td>Dosage3</td>
                        </>
                      )}

                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((element) => (
                      <tr key={element._id}>
                        <td>{new Date(element.date).toLocaleDateString()}</td>
                        <td>{element.service}</td>
                        {filtreFiche === "proteinurie" && (
                          <>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.proteinurie}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.diurese}
                            </td>
                          </>
                        )}
                        {filtreFiche === "calcuim" && (
                          <>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.calcuim}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.phosphore}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.magnesium}
                            </td>

                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.ferSerrique}
                            </td>
                          </>
                        )}
                        {filtreFiche === "bilirubine" && (
                          <>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.bilirubineSangT}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.bilirubineSangD}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.bilirubineUrineD}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.bilirubineUrineD}
                            </td>
                            <td>
                              {element.document.data &&
                                element.document.data.rai}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.coombs}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.crp}
                            </td>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.calcuim}
                            </td>
                          </>
                        )}
                        {filtreFiche === "crp" && (
                          <>
                            <td>
                              {" "}
                              {element.document.data &&
                                element.document.data.crp}
                            </td>
                          </>
                        )}
                        {filtreFiche === "fer serrique" && (
                          <>
                            <td>
                              {element.document.data &&
                                element.document.data.ferSerrique}
                            </td>
                          </>
                        )}
                        {filtreFiche === "hgpo" && (
                          <>
                            <td>
                              {element.document.data &&
                                element.document.data.dosage1}
                            </td>
                            <td>
                              {element.document.data &&
                                element.document.data.dosage2}
                            </td>
                            <td>
                              {element.document.data &&
                                element.document.data.dosage3}
                            </td>
                          </>
                        )}
                        <td>
                          <div className="action">
                            <Link
                              to={`/laboAM/biochimie/modifier/${filtreFiche}/${element._id}`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="#637381"
                                viewBox="0 0 512 512"
                              >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                              </svg>
                            </Link>

                            <svg
                              onClick={(e) => {
                                imprimerDoc(element);
                              }}
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              fill="#637381"
                              viewBox="0 0 512 512"
                            >
                              {" "}
                              <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
                    <p> Etes vous sur des vouloir supprimer ce rendez-vous?</p>
                    <div className="repense">
                      <button>OUI</button>
                      <button>NON</button>
                    </div>
                  </Modal>
                </table>
                <Pagination
                  pageActuel={currentPage}
                  totalPage={totalPages}
                  cliqueAvancer={pageSuivante}
                />
              </div>{" "}
            </>
          </>
        )}
        <button className="btn_retour" onClick={navigation}>
          Retour
        </button>
      </div>
    </>
  );
};

export default TableBiochimie;
