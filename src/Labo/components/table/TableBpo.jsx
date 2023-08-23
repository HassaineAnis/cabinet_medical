import React, { useState, useEffect } from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

const nombreElementPage = 6;
const TableBpo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const { modalIsOpen, openModal, closeModal } = useModal();

  const [filtreFiche, setFiche] = useState("tp");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);
  //const [, setPatient] = useState([]);
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
            element.typeAnalyse === "B.P.O"
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

  return (
    <>
      <h2>Liste des Analyse B.P.O</h2>{" "}
      <div className="consultation_table">
        <ToastContainer />
        <div className="consultation_table_btn">
          <Link
            to={`/laboAM/B.P.O/ajouter/${filtreFiche}/${id}`}
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
            <option value="tp">TP</option>
            <option value="gs">GS</option>
            <option value="hiv">HIV HBS HCV</option>
            <option value="b.p.o">BPO</option>
          </select>
        </div>
        {isLoading ? (
          <div style={{ alignSelf: "center" }} className="spinner"></div>
        ) : (
          <>
            <div className="consultation_table__content">
              <table className="table">
                <thead>
                  <tr className="table_entete">
                    <td>Date</td>
                    <td>Sérvice</td>
                    {filtreFiche === "b.p.o" && (
                      <>
                        <td>Glucose</td>
                        <td>Uree</td>
                        <td>Creatinemie</td>
                      </>
                    )}
                    {(filtreFiche === "tp" || filtreFiche === "b.p.o") && (
                      <>
                        <td>Temps de Prothrombine</td>
                        <td>Taux{"(%)"}</td>
                        <td>INR</td>

                        <td>TCK</td>
                      </>
                    )}
                    {filtreFiche === "gs" && (
                      <>
                        <td>Groupe sanguin</td>
                        <td>Rhésus</td>
                      </>
                    )}
                    {filtreFiche === "hiv" && (
                      <>
                        <td>HIV</td>
                        <td>HBS</td>
                        <td>HCV</td>
                        <td>BW</td>
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
                      {filtreFiche === "b.p.o" && (
                        <>
                          <td>
                            {element.document.data &&
                              element.document.data.glucose}
                          </td>
                          <td>
                            {element.document.data &&
                              element.document.data.uree}
                          </td>
                          <td>
                            {element.document.data &&
                              element.document.data.creatinimie}
                          </td>
                        </>
                      )}

                      {(filtreFiche === "tp" || filtreFiche === "b.p.o") && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.temps}
                          </td>
                          <td>
                            {element.document.data &&
                              element.document.data.taux}
                            {"(%)"}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.inr}
                          </td>

                          <td>
                            {" "}
                            {element.document.data && element.document.data.tck}
                          </td>
                        </>
                      )}
                      {filtreFiche === "gs" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.gs}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.rhesus}
                          </td>
                        </>
                      )}
                      {filtreFiche === "hiv" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.hiv}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.hbs}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.hcv}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.bw}{" "}
                          </td>
                        </>
                      )}
                      <td>
                        <div className="action">
                          <Link
                            to={`/laboAM/B.P.O/modifier/${filtreFiche}/${element._id}`}
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
        )}
        <button className="btn_retour" onClick={navigation}>
          Retour
        </button>
      </div>
    </>
  );
};

export default TableBpo;
