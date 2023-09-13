import React from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../pagination/Pagination";
import "../../../style/adminStyle/table/tableUser.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../style/loader/loader.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const nombreElementPage = 5;

const TablePresta = () => {
  const { modalIsOpen1, openModal1, closeModal1 } = useModal();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [convention, setConvention] = useState("");

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
        const response = await fetch(
          `http://localhost:3000/api/convention/prestation/${id}`
        );

        const { prestation, convention } = await response.json();

        //rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
        const resultRecherche = prestation.filter((element) => {
          const intervention = `${element.typeIntervention}`.toLowerCase();

          const prefix = searchTerm.toLowerCase();

          return intervention.startsWith(prefix);
        });
        setTotalPages(
          !recherche
            ? Math.ceil(prestation.length / nombreElementPage)
            : Math.ceil(resultRecherche.length / nombreElementPage)
        );
        setData(!recherche ? prestation : resultRecherche);
        setConvention(convention.convention);
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

  return (
    <div className="user">
      <ToastContainer />
      <h2 style={{ textTransform: "capitalize" }}>{convention}</h2>
      <div className="user_table">
        <div className="user_table_btn">
          <Link
            to={`/admin/convention/prestation/ajouter/${id}`}
            className="btn_ajouter"
          >
            Ajouter
          </Link>

          <SearchBar onSearchChange={handleSearchChange} />
          <Link to={-1} className="btn_ajouter">
            Retour
          </Link>
        </div>
      </div>
      {isLoading ? (
        <div className="spinner" style={{ alignSelf: "center" }}>
          {" "}
        </div>
      ) : (
        <div className="consultation_table__content">
          <table className="table">
            <thead>
              <tr className="table_entete">
                <td>Type d'intervention</td>
                <td>Prix</td>
                <td>Prix de Convention</td>
              </tr>
            </thead>
            <tbody>
              {currentData.map((element) => (
                <tr key={element._id}>
                  <td>{element.typeIntervention}</td>
                  <td>
                    {" "}
                    {element.prix.toLocaleString("fr-DZ", {
                      style: "currency",
                      currency: "DZD",
                    })}
                  </td>
                  <td>
                    {" "}
                    {element.prixConvention.toLocaleString("fr-DZ", {
                      style: "currency",
                      currency: "DZD",
                    })}
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
      )}

      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        className="custom_modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
          },
        }}
      >
        <div className="modal_btn">
          <button onClick={closeModal1}>Fermer</button>
        </div>
      </Modal>
    </div>
  );
};

export default TablePresta;
