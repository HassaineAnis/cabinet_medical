import React, { useState, useEffect } from "react";

import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

const nombreElementPage = 6;
const TableQnt = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const { id } = useParams();
  const [filtreQnt, setFiltre] = useState("ajout");

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  const [produit, setProduit] = useState();
  const [quantiteTotale, setTotale] = useState(0);
  const afficherQntTotale = (data) => {
    const qntAjouter = data.filter(
      (element) => element.typeOperation === "ajout"
    );
    const qntRetirer = data.filter(
      (element) => element.typeOperation === "retrait"
    );

    return (
      qntAjouter.reduce((acc, item) => acc + item.quantite, 0) -
      qntRetirer.reduce((acc, item) => acc + item.quantite, 0)
    );
  };
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/quantite/${id}`
        );

        const { quantites, produit } = await response.json();
        //rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
        setProduit(produit);
        setTotale(afficherQntTotale(quantites));
        const quantiteFitre = quantites.filter(
          (element) => element.typeOperation === filtreQnt
        );

        setTotalPages(Math.ceil(quantiteFitre.length / nombreElementPage));
        setData(quantiteFitre);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };

    fetchRdv();
  }, [id, filtreQnt]);

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div style={{ alignSelf: "center" }} className="spinner"></div>
      ) : (
        <>
          <h2> Details Produit</h2>
          <div className="consultation_table">
            <div
              className="consultation_table_btn"
              style={{ flexDirection: "row-reverse" }}
            >
              <select
                name="fitreQnt"
                id="filtreQnt"
                onChange={(e) => setFiltre(e.target.value)}
                value={filtreQnt}
              >
                <option value="ajout">Entrées</option>
                <option value="retrait">Sorties</option>
              </select>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    Dénomination Comerciale:
                  </strong>
                  {` ${produit && produit.denominationComerciale}`}
                </p>
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    DCI:
                  </strong>
                  {` ${produit && produit.dci}`}
                </p>{" "}
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    Quantité en stock:
                  </strong>
                  {` ${data && quantiteTotale}`}
                </p>
              </div>
              <button
                className="btn_ajout"
                style={{
                  backgroundColor: "darkred",
                  //width: "6rem",
                  padding: "0 2rem",
                }}
              >
                Retour
              </button>
            </div>

            <div className="consultation_table__content">
              <table className="table">
                <thead>
                  <tr className="table_entete">
                    {filtreQnt === "ajout" && (
                      <>
                        <td>Date Entrée</td>
                        <td>Date Péremption</td>
                        <td>fournisseur</td>
                      </>
                    )}

                    {filtreQnt === "retrait" && (
                      <>
                        <td>Date Sortie</td>
                        <td>Service</td>
                      </>
                    )}
                    <td>Quantité</td>

                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((element) => (
                    <tr key={element._id}>
                      <td>{new Date(element.date).toLocaleDateString()}</td>
                      {filtreQnt === "ajout" && (
                        <>
                          <td>
                            {new Date(
                              element.datePeremption
                            ).toLocaleDateString()}
                          </td>
                          <td>{element.fournisseur}</td>
                        </>
                      )}
                      {filtreQnt === "retrait" && <td>{element.service}</td>}
                      <td>{element.quantite} </td>

                      <td>
                        <div className="action">
                          <Link
                            to={`/surveillant/navette/modifier/${element._id}`}
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
              </table>
              <Pagination
                pageActuel={currentPage}
                totalPage={totalPages}
                cliqueAvancer={pageSuivante}
              />
            </div>
          </div>
        </>
      )}
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
    </>
  );
};

export default TableQnt;
