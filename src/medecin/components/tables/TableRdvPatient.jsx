import React, { useState, useEffect } from "react";

import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";
import socket from "../../../socket/Socket";
import "../../../style/medecinStyle/popup/modalRdv.css";

const nombreElementPage = 6;

const TableRdvPatient = ({ id }) => {
  const {
    modalIsOpen,
    openModal,
    closeModal,
    modalIsOpen1,
    openModal1,
    closeModal1,
  } = useModal();
  const [currentObjet, setObjet] = useState({});

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);
  const [rendeVous, setRendeVous] = useState([]);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    socket.connect();
    const fetchRdv = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/rendez-vous/patient/${id}`
          );

          const rendeVous = await response.json();
          rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
          const rdvNonArchive = rendeVous.filter((element) => !element.status);
          setTotalPages(Math.ceil(rdvNonArchive.length / nombreElementPage));
          setData(rdvNonArchive);

          setRendeVous(rendeVous);
        } catch (e) {
          console.log("erreur!!!", e);
          setErreur(true);
        } finally {
          setLoading(false);

          setCurrentPage(1);
        }
      }
    };
    socket.on("afterDeleteRdvPatient", (data) => {
      fetchRdv();
    });
    socket.on("afterConfirmerdv", (data) => {
      fetchRdv();
    });

    fetchRdv();
    return () => {
      socket.off("afterDeleteRdvPatient");
      socket.off("afterConfirmerdv");
      socket.disconnect();
    };
  }, []);

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }

  const afficherDetails = (data) => {
    openModal1();

    console.log(data);
  };

  const confimeRemove = (data) => {
    setObjet(data);

    openModal();
  };
  const RemoveData = async () => {
    // console.log(currentObjet.user._id)

    try {
      const reponse = await fetch(
        `http://localhost:3000/api/rendez-vous/${currentObjet._id}`,
        {
          method: "DELETE",
        }
      );

      if (reponse.ok) {
        closeModal();
        Notification.reussite(`Rendez-vous supprimer avec succés.`);
        socket.emit("supprimerRdvPatient", {
          message: "rendez-vous supprimer",
        });
      }
    } catch (error) {
      Notification.echec("Erreur de suppression.");
      console.log(error);
    }
  };

  const passeRendeVous = async (id) => {
    closeModal1();
    try {
      const response = await fetch(
        `http://localhost:3000/api/rendez-vous/confirmer/${id}`,
        {
          method: "PUT", // ou "PATCH" selon votre API
          body: JSON.stringify(currentData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        Notification.reussite("Rendez-vous Confirmé avec succès.");
        socket.emit("confirmerdv", { message: "confirmer" });
      } else {
        console.error("Erreur lors de la requête");
        Notification.echec("Échec lors de la confirmation du rendez-vous.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      Notification.echec("Échec de la requête.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <div className="table_rdv_patient">
      <ToastContainer />

      <div className="consultation_table__content">
        <table className="table">
          <thead>
            <tr className="table_entete">
              <td>Date</td>
              <td>Motif</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((element) => (
              <tr key={element._id}>
                <td> {new Date(element.date).toLocaleDateString()} </td>
                <td>{element.motif}</td>

                <td
                  style={{
                    color: `${element.status ? "darkgreen" : "darkred"}`,
                  }}
                >
                  {element.status ? "Passé" : "En attente"}
                </td>
                <td>
                  <div className="action">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={20}
                      height={20}
                      fill="#637381"
                      onClick={(e) => {
                        setObjet(element);
                        afficherDetails(element);
                      }}
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                    <Link to={`/medecin/rendez-vous/modifier/${element._id}`}>
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
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      fill="#637381"
                      viewBox="0 0 448 512"
                      onClick={(e) => confimeRemove(element)}
                    >
                      {" "}
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
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
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "99" },
            }}
          >
            <p> Etes vous sur des vouloir supprimer ce rendez-vous?</p>
            <div className="repense">
              <button onClick={RemoveData}>OUI</button>
              <button onClick={closeModal}>NON</button>
            </div>
          </Modal>

          <Modal
            isOpen={modalIsOpen1}
            onRequestClose={closeModal1}
            className="rdv"
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "99" },
            }}
          >
            <div className="modal_profil">
              <h2>Détails du Rendez-Vous</h2>
              <hr />

              <div className="modal_profil_info">
                <div className="ligne">
                  <p>Nom : </p> <span>{currentObjet.nom}</span>
                </div>
                <div className="ligne">
                  <p>Prénom : </p> <span>{currentObjet.prenom}</span>
                </div>
                <div className="ligne">
                  {" "}
                  <p>Sexe :</p>
                  <span>{currentObjet.sexe}</span>{" "}
                </div>

                <div className="ligne">
                  {" "}
                  <p>Adresse : </p> <span>{currentObjet.adresse} </span>
                </div>
                <div className="ligne">
                  {" "}
                  <p>Numéro De Téléphone :</p>{" "}
                  <span>{currentObjet.numeroTel}</span>
                </div>
                <div className="ligne">
                  {" "}
                  <p>Date du Rendez-vous :</p>{" "}
                  <span>
                    {new Date(currentObjet.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="ligne">
                  <p>Motif de rendez-vous : </p>{" "}
                  <span>{currentObjet.motif}</span>
                </div>
                {currentObjet.motif === "Chérurgie" && (
                  <div className="ligne">
                    {" "}
                    <p>Type de Chérurgie :</p>
                    <span> {currentObjet.typeCherurgie} </span>{" "}
                  </div>
                )}
                {currentObjet.motif === "Accouchement" && (
                  <div className="ligne">
                    {" "}
                    <p>Type d'Accouchement :</p>
                    <span> {currentObjet.typeAccouchement} </span>{" "}
                  </div>
                )}
              </div>
            </div>

            <div className="modal_btn">
              <button onClick={closeModal1}>Fermer</button>
              {currentObjet.status ? (
                <div className="confirme">
                  <span> Rendez-vous passé</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#637381"
                    height={30}
                    width={30}
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                  </svg>
                </div>
              ) : (
                <button onClick={(e) => passeRendeVous(currentObjet._id)}>
                  Confirmé
                </button>
              )}
            </div>
          </Modal>
        </table>
        <Pagination
          pageActuel={currentPage}
          totalPage={totalPages}
          cliqueAvancer={pageSuivante}
        />
      </div>
      <div className="table_btn">
        <Link
          to={`/medecin/patient/dossier/rendez-vous/ajouter/${id}`}
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
          Ajouter
        </Link>

        <Link
          to={`/medecin/patient/dossier/rendez-vous/archives/${id}`}
          style={{ textDecoration: "none" }}
          className="btn_archive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            stroke="#FFFF"
            viewBox="0 0 512 512"
          >
            <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
          </svg>
          Archives
        </Link>
      </div>
    </div>
  );
};

export default TableRdvPatient;
