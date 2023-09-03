import React, { useState, useEffect } from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";

import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";

import socket from "../../../socket/Socket";
import "../../../style/medecinStyle/popup/modalRdv.css";

const nombreElementPage = 6;

const TableConsultation = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState([]);
  const [erreur, setErreur] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recherche, setRecherche] = useState(false);

  const [filtre, setFiltre] = useState(false);
  const [id, setId] = useState("");

  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setSearchTerm(event.target.value);
      setRecherche(true);
    } else {
      setRecherche(false);
    }
  };

  useEffect(() => {
    socket.connect();
    const fetchRdv = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/consultation`);

        const consult = await response.json();
        consult.sort((a, b) => new Date(b.date) - new Date(a.date));
        const consultationFiltrer = consult.filter(
          (element) => element.status === filtre
        );
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
            : Math.ceil(consultationFiltrer.length / nombreElementPage)
        );
        setData(recherche ? resultRecherche : consultationFiltrer);

        setConsultation(consultationFiltrer);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };

    fetchRdv();
    socket.on("afterPayeConsult", (data) => {
      fetchRdv();
    });
    socket.on("afterAddConsult", (data) => {
      fetchRdv();
    });
    fetchRdv();
    return () => {
      socket.off("afterPayeConsult");
      socket.off("afterAddConsult");
      socket.disconnect();
    };
  }, [recherche, searchTerm, filtre]);
  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {};

    try {
      const response = await fetch(
        `http://localhost:3000/api/consultation/paye/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite("Montant consultation encaissé  avec succés.");
        socket.emit("payeConsult", { message: "payer" });
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'encaissement du montant.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <>
      <ToastContainer />

      <div className="consultation_table">
        <div className="consultation_table_btn">
          <select
            name="motif"
            id="motif"
            onChange={(e) => setFiltre(e.target.value === "true")}
            //value={filtre}
          >
            <option value="false">Non Payé</option>
            <option value="true">Payé</option>
          </select>
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
                    <td>statut</td>
                    {!filtre && <td>Actions</td>}
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
                        {`${element.medecin && element.medecin.nom} ${
                          element.medecin && element.medecin.prenom
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
                      {element.status ? (
                        <td style={{ color: "darkgreen" }}>Payé</td>
                      ) : (
                        <td style={{ color: "darkred" }}>Non Payé</td>
                      )}

                      {!element.status && (
                        <td>
                          {" "}
                          <div className="action">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={25}
                              height={25}
                              fill="#637381"
                              viewBox="0 0 576 512"
                              onClick={(e) => {
                                setId(element._id);
                                verificationData(e);
                              }}
                            >
                              <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zM272 192H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16s7.2-16 16-16zM256 304c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H272c-8.8 0-16-7.2-16-16zM164 152v13.9c7.5 1.2 14.6 2.9 21.1 4.7c10.7 2.8 17 13.8 14.2 24.5s-13.8 17-24.5 14.2c-11-2.9-21.6-5-31.2-5.2c-7.9-.1-16 1.8-21.5 5c-4.8 2.8-6.2 5.6-6.2 9.3c0 1.8 .1 3.5 5.3 6.7c6.3 3.8 15.5 6.7 28.3 10.5l.7 .2c11.2 3.4 25.6 7.7 37.1 15c12.9 8.1 24.3 21.3 24.6 41.6c.3 20.9-10.5 36.1-24.8 45c-7.2 4.5-15.2 7.3-23.2 9V360c0 11-9 20-20 20s-20-9-20-20V345.4c-10.3-2.2-20-5.5-28.2-8.4l0 0 0 0c-2.1-.7-4.1-1.4-6.1-2.1c-10.5-3.5-16.1-14.8-12.6-25.3s14.8-16.1 25.3-12.6c2.5 .8 4.9 1.7 7.2 2.4c13.6 4.6 24 8.1 35.1 8.5c8.6 .3 16.5-1.6 21.4-4.7c4.1-2.5 6-5.5 5.9-10.5c0-2.9-.8-5-5.9-8.2c-6.3-4-15.4-6.9-28-10.7l-1.7-.5c-10.9-3.3-24.6-7.4-35.6-14c-12.7-7.7-24.6-20.5-24.7-40.7c-.1-21.1 11.8-35.7 25.8-43.9c6.9-4.1 14.5-6.8 22.2-8.5V152c0-11 9-20 20-20s20 9 20 20z" />
                            </svg>
                          </div>
                        </td>
                      )}
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
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="custom_modal"
              style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
            >
              <p> Confirmé les modifications aporté au produit ? </p>
              <div className="repense">
                <button onClick={enregitrer}>OUI</button>
                <button onClick={closeModal}>NON</button>
              </div>
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default TableConsultation;
