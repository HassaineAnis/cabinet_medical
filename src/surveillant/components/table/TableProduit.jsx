import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

const nombreElementPage = 6;
const TableProduit = () => {
  const { modalIsOpen, openModal, closeModal } = useModal();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [recherche, setRecherche] = useState(false);

  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setSearchTerm(event.target.value);
      setRecherche(true);
    } else {
      setRecherche(false);
    }
  };

  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/produit`);

        const navettes = await response.json();
        //rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
        const resultRecherche = navettes.filter((element) => {
          const dci = `${element.dci}`.toLowerCase();
          const denominationComerciale =
            `${element.denominationComerciale}`.toLowerCase();

          const prefix = searchTerm.toLowerCase();

          return (
            dci.startsWith(prefix) || denominationComerciale.startsWith(prefix)
          );
        });
        setTotalPages(
          !recherche
            ? Math.ceil(navettes.length / nombreElementPage)
            : Math.ceil(resultRecherche.length / nombreElementPage)
        );
        setData(!recherche ? navettes : resultRecherche);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };

    fetchRdv();
  }, [recherche, searchTerm]);

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }
  console.log(data);

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }
  return (
    <div className="consultation_table">
      <ToastContainer />

      <div className="consultation_table_btn">
        <Link
          to="/surveillant/produit/ajouter"
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
          Ajouter un Produit
        </Link>

        <SearchBar onSearchChange={handleSearchChange} />
      </div>
      {isLoading ? (
        <div style={{ alignSelf: "center" }} className="spinner"></div>
      ) : (
        <>
          <div className="consultation_table__content">
            <table className="table">
              <thead>
                <tr className="table_entete">
                  <td>Dénomination Comerciale</td>
                  <td>DCI</td>
                  <td>Prix</td>
                  <td>Etat des Stock</td>

                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentData.map((element) => (
                  <tr key={element._id}>
                    <td>{element.denominationComerciale}</td>
                    <td>{element.dci} </td>
                    <td>
                      {element.prix.toLocaleString("fr-DZ", {
                        style: "currency",
                        currency: "DZD",
                      })}
                    </td>
                    {element.quantiteTotale >= 50 ? (
                      <td style={{ color: "green" }}>Normale</td>
                    ) : (
                      <td style={{ color: "red" }}>Rupture de stock</td>
                    )}

                    <td>
                      <div className="action">
                        <Link
                          to={`/surveillant/produit/details/${element._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="#637381"
                            viewBox="0 0 512 512"
                          >
                            {" "}
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                          </svg>
                        </Link>
                        <Link
                          to={`/surveillant/produit/quantite/ajouter/${element._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="#637381"
                            viewBox="0 0 512 512"
                          >
                            {" "}
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                          </svg>
                        </Link>
                        <Link
                          to={`/surveillant/produit/quantite/retirer/${element._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="#637381"
                            viewBox="0 0 512 512"
                          >
                            {" "}
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                          </svg>
                        </Link>

                        <Link
                          to={`/surveillant/produit/modifier/${element._id}`}
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
    </div>
  );
};

export default TableProduit;
