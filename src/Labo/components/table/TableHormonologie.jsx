import React, { useState, useEffect } from "react";

import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

const nombreElementPage = 6;
const TableHormonologie = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const verifieToxoplasmose = (valeur) => {
    const intvaleur = parseFloat(valeur);
    if (intvaleur < 4) {
      return "Négatif";
    }
    if (intvaleur >= 4 && intvaleur <= 8) {
      return "Douteux";
    }
    if (intvaleur >= 8) {
      return "Positif";
    }
  };

  const { modalIsOpen, openModal, closeModal } = useModal();

  const [filtreFiche, setFiche] = useState("rubeole");

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
            element.document.nom.toLowerCase() === filtreFiche.toLowerCase() &&
            element.typeAnalyse === "hormonologie"
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
    return <div className="consultation_table">Erreur de chargement...</div>;
  }

  return (
    <>
      <h2>Liste des Analyse Hormonologique</h2>{" "}
      <div className="consultation_table">
        <ToastContainer />
        <div className="consultation_table_btn">
          <Link
            to={`/laboAM/Hormonologie/ajouter/${filtreFiche}/${id}`}
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
            <option value="rubeole">Rubeole</option>
            <option value="tsh">TSH</option>
            <option value="vitamine d">Vitamine D</option>
            <option value="psa.t">PSA.T</option>
            <option value="prolE2">ProlE2</option>
            <option value="mini vidas">Mini Vidas</option>
            <option value="hcg">HCG</option>
            <option value="ft4">FT4</option>
            <option value="ft3">FT3</option>
            <option value="ferritine">Ferritine</option>
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
                    {filtreFiche === "ferritine" && (
                      <>
                        <td>Ferritine</td>
                        <td>Fer Serrique</td>
                      </>
                    )}

                    {filtreFiche === "hcg" && (
                      <>
                        <td>BHCG</td>
                        <td>Seuil De Sensibilité</td>
                      </>
                    )}
                    {filtreFiche === "prolE2" && (
                      <>
                        <td>Dosage De La Prolactine</td>
                        <td>Dosage De L'oestradiol</td>
                      </>
                    )}
                    {filtreFiche === "psa.t" && (
                      <>
                        <td>Dosage de la PSA.T</td>
                        <td>Ionogramme Sanguin</td>
                        <td>Na+</td>
                        <td>K+</td>
                      </>
                    )}
                    {filtreFiche === "vitamine d" && (
                      <>
                        <td>Vitamine D</td>
                        <td>Calcium</td>
                      </>
                    )}
                    {filtreFiche === "tsh" && <td>TSH US</td>}
                    {filtreFiche === "ft4" && (
                      <td> Dosage de l'Hormone Thyroxine Libre(F-T4)</td>
                    )}
                    {filtreFiche === "ft3" && (
                      <td> Dosage de l'Hormone triiodothyronine Libre(F-T3)</td>
                    )}

                    {filtreFiche === "mini vidas" && (
                      <>
                        <td>Dosage de l'hormone Thyreotrope(TSH US)</td>
                        <td>Dosage de l'Hormone Thyroxine Libre(F-T4)</td>
                        <td>Dosage de l'Hormone Triodothyronine Libre(F-T3)</td>
                      </>
                    )}
                    {filtreFiche === "rubeole" && (
                      <>
                        <td>Rubéole,Sérologie lgG(UI/ml)</td>
                        <td>Rubéole,Sérologie lgG</td>
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
                      {filtreFiche === "rubeole" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.rubeole}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              verifieToxoplasmose(
                                element.document.data.rubeole
                              )}
                          </td>
                        </>
                      )}
                      {filtreFiche === "tsh" && (
                        <td>
                          {" "}
                          {element.document.data && element.document.data.tsh}
                        </td>
                      )}
                      {filtreFiche === "ferritine" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.ferritine}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.ferSerrique}
                          </td>
                        </>
                      )}
                      {filtreFiche === "prolE2" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.prolactine}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.oestradiol}
                          </td>
                        </>
                      )}
                      {filtreFiche === "psa.t" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.psat}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.inograme}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.na}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.k}
                          </td>
                        </>
                      )}
                      {filtreFiche === "vitamine d" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.vitamineD}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.calcuim}
                          </td>
                        </>
                      )}
                      {filtreFiche === "ft4" && (
                        <td>
                          {" "}
                          {element.document.data && element.document.data.ft4}
                        </td>
                      )}
                      {filtreFiche === "ft3" && (
                        <td>
                          {" "}
                          {element.document.data && element.document.data.ft3}
                        </td>
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
                            {element.document.data && element.document.data.bw}
                          </td>
                        </>
                      )}

                      {filtreFiche === "mini vidas" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.tsh}
                          </td>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.ft4}
                          </td>
                          <td>
                            {element.document.data && element.document.data.ft3}
                          </td>
                        </>
                      )}
                      {filtreFiche === "hcg" && (
                        <>
                          <td>
                            {" "}
                            {element.document.data && element.document.data.hcg}
                          </td>
                          <td>
                            {" "}
                            {element.document.data &&
                              element.document.data.seuilSensibilite}
                          </td>
                        </>
                      )}
                      <td>
                        <div className="action">
                          <Link
                            to={`/laboAM/Hormonologie/modifier/${filtreFiche}/${element._id}`}
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

export default TableHormonologie;
