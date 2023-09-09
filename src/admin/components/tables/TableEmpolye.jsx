import React from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../pagination/Pagination";
import "../../../style/adminStyle/table/tableUser.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../style/loader/loader.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profil from "../../../assets/avatarH.png";
import socket from "../../../socket/Socket";
import logo from "../../../assets/logo (1).png";
import { useReactToPrint } from "react-to-print";

Modal.setAppElement("#root");

const nombreElementPage = 5;

const TableEmpolye = () => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
  const [fetchData, setFetch] = useState([]);
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

  const resultRecherche = fetchData.filter((consult) => {
    const fullName = `${consult.nom} ${consult.prenom}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    socket.connect();

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/personnel`);

        const users = await response.json();
        //users.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTotalPages(
          !recherche
            ? Math.ceil(users.length / nombreElementPage)
            : Math.ceil(resultRecherche.length / nombreElementPage)
        );
        setData(!recherche ? users : resultRecherche);

        setFetch(users);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };

    socket.on("afterDeleteData", (data) => {
      fetchUsers();
    });

    fetchUsers();
    return () => {
      socket.off("afterDeleteData");
      socket.disconnect();
    };
  }, [recherche]);

  const confimeRemove = (data) => {
    setObjet(data);
    openModal();
  };

  const afficherDetails = () => {
    openModal1();
  };

  const RemoveData = async () => {
    console.log(currentObjet._id);

    try {
      const reponse = await fetch(
        `http://localhost:3000/api/personnel/${currentObjet._id}`,
        {
          method: "DELETE",
        }
      );

      if (reponse.ok) {
        closeModal();
        Notification.reussite(`Employé supprimer avec succés.`);
        socket.emit("supprimerData", { message: "supprimer" });
      }
    } catch (error) {
      Notification.echec("Erreur de suppression.");
      console.log(error);
    }
  };

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }

  if (erreur) {
    return <div className="user">Erreur de chargement </div>;
  }
  return (
    <div className="user">
      <div
        className="carteImprimer"
        style={{ position: "absolute", top: "-1000%", opacity: "0" }}
      >
        <div className="cartPro" ref={componentRef}>
          <div className="entete">
            {<img src={logo} alt="logo" height={80} width={80} />}
            <h3>
              Etablissement hospitalier Priveé <br />
              la colombe
            </h3>
            {<img src={logo} alt="logo" height={80} width={80} />}
          </div>
          <div className="info">
            <picture>
              {currentObjet.photo && (
                <img src={currentObjet.photo} alt="profil" />
              )}
            </picture>
            <div className="info_employe">
              <p>
                <strong>Nom :</strong>
                {`${currentObjet && currentObjet.nom}`}
              </p>
              <p>
                <strong>Prénom :</strong>
                {`${currentObjet && currentObjet.prenom}`}
              </p>
              <p>
                <strong>Fonction :</strong>
                {`${currentObjet && currentObjet.specialite}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <h2>Liste des Employés</h2>
      <div className="user_table">
        <div className="user_table_btn">
          <Link to={`/admin/personnel/ajouter`} className="btn_ajouter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="#fff"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Ajouté Un Employé
          </Link>
          <SearchBar onSearchChange={handleSearchChange} />
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
                <td>Nom</td>
                <td>Prénom</td>
                <td>Sexe</td>
                <td>N° Téléphone </td>
                <td>Date de naissance</td>
                <td>Adresse</td>
                <td>N° Sécurité Sociale</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {currentData.map((element) => (
                <tr key={element._id}>
                  <td>{element.nom}</td>
                  <td>{element.prenom}</td>
                  <td>{element.sexe}</td>
                  <td>{element.numeroTel}</td>
                  <td>
                    {new Date(element.dateNaissance).toLocaleDateString()}
                  </td>
                  <td>{element.adresse}</td>
                  <td>{element.numeroSecurite}</td>

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
                          afficherDetails();
                        }}
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                      </svg>
                      <Link to={`/admin/personnel/profile/${element._id}`}>
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
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  zIndex: "99",
                },
              }}
            >
              <p>
                {" "}
                Etes vous sur des vouloir supprimer{" "}
                {`${currentObjet.nom} ${currentObjet.prenom}`} ?{" "}
              </p>
              <div className="repense">
                <button onClick={RemoveData}>OUI</button>
                <button onClick={closeModal}>NON</button>
              </div>
            </Modal>

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
              <div className="modal_profil">
                <h2 style={{ margin: "0" }}>Détails du Médecin</h2>
                <hr />
                <picture>
                  <img
                    src={currentObjet.photo ? currentObjet.photo : profil}
                    alt="profilImage"
                  />
                </picture>

                <div className="modal_profil_info">
                  <div className="ligne">
                    <p>Nom : </p>{" "}
                    <span>{currentObjet && currentObjet.nom}</span>
                  </div>
                  <div className="ligne">
                    <p>Prénom : </p>{" "}
                    <span>{currentObjet && currentObjet.prenom}</span>
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Sexe :</p>
                    <span>{currentObjet && currentObjet.sexe}</span>{" "}
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Date de Naissance :</p>{" "}
                    <span>
                      {currentObjet &&
                        new Date(
                          currentObjet.dateNaissance
                        ).toLocaleDateString()}
                    </span>{" "}
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Date D'entrée :</p>{" "}
                    <span>
                      {currentObjet &&
                        new Date(currentObjet.dateEntre).toLocaleDateString()}
                    </span>{" "}
                  </div>{" "}
                  {currentObjet.dateSortie && (
                    <div className="ligne">
                      {" "}
                      <p>Date De Sortie :</p>{" "}
                      <span>
                        {currentObjet &&
                          new Date(
                            currentObjet.dateSortie
                          ).toLocaleDateString()}
                      </span>{" "}
                    </div>
                  )}
                  <div className="ligne">
                    {" "}
                    <p>Adresse : </p>{" "}
                    <span>{currentObjet && currentObjet.adresse}</span>
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Numéro De Téléphone :</p>{" "}
                    <span>{currentObjet && currentObjet.numeroTel}</span>
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Numéro de Sécurité Sociale :</p>{" "}
                    <span>{currentObjet && currentObjet.numeroSecurite}</span>
                  </div>
                  <div className="ligne">
                    {" "}
                    <p>Observation :</p>{" "}
                    <span>{currentObjet && currentObjet.observation}</span>
                  </div>
                </div>
              </div>

              <div
                className="modal_btn"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <button
                  onClick={closeModal1}
                  style={{ backgroundColor: "darkred" }}
                >
                  Fermer
                </button>
                <button onClick={handlePrint}>Imprimer</button>
              </div>
            </Modal>
          </table>
          <Pagination
            pageActuel={currentPage}
            totalPage={totalPages}
            cliqueAvancer={pageSuivante}
          />
        </div>
      )}
    </div>
  );
};

export default TableEmpolye;
