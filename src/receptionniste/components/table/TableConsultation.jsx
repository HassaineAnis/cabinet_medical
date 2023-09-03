import React, { useState, useEffect } from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";

import "react-toastify/dist/ReactToastify.css";

//import socket from '../../../socket/Socket';
import "../../../style/medecinStyle/popup/modalRdv.css";

const nombreElementPage = 6;

const TableConsultation = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState([]);
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
        const response = await fetch(`http://localhost:3000/api/consultation`);

        const consult = await response.json();
        consult.sort((a, b) => new Date(b.date) - new Date(a.date));
        const resultRecherche = consult.filter((element) => {
          const nom = element.patient && `${element.patient.nom}`.toLowerCase();
          const prenom =
            element.patient && `${element.patient.prenom}`.toLowerCase();

          const prefix = searchTerm.toLowerCase();

          return nom.startsWith(prefix) || prenom.startsWith(prefix);
        });

        setTotalPages(
          recherche
            ? Math.ceil(resultRecherche.length / nombreElementPage)
            : Math.ceil(consult.length / nombreElementPage)
        );
        setData(recherche ? resultRecherche : consult);

        setConsultation(consult);
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

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <div className="consultation_table">
      <div className="consultation_table_btn">
        <SearchBar onSearchChange={handleSearchChange} />
      </div>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="consultation_table__content">
            <table className="table">
              <thead>
                <tr className="table_entete">
                  <td>Patient</td>
                  <td>Médecin</td>
                  <td>Date</td>
                  <td>Montant</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentData.map((element) => (
                  <tr key={element._id}>
                    <td>
                      {`${element.patient && element.patient.nom} ${
                        element.patient && element.patient.prenom
                      }`}
                    </td>
                    <td>
                      {`${element.medecin && element.patient.nom} ${
                        element.medecin && element.patient.prenom
                      }`}
                    </td>
                    <td>{new Date(element.date).toLocaleDateString()}</td>
                    <td>
                      {" "}
                      {parseInt(element.montant).toLocaleString("fr-DZ", {
                        style: "currency",
                        currency: "DZD",
                      })}
                    </td>

                    <td>
                      <div className="action">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={20}
                          height={20}
                          fill="#637381"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
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
        </>
      )}
    </div>
  );
};

export default TableConsultation;
