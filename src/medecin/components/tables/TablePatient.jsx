import React, { useState, useEffect } from "react";
import SearchBar from "../serchBar/SearchBar";
import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
 

const nombreElementPage = 6;

function TablePatient(props) {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  const {
    modalIsOpen,
    openModal,
    closeModal,
  } = useModal();
 
   
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState([]);
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

  const filteredRdv = patient.filter((rdv) => {
    const fullName = `${rdv.nom} ${rdv.prenom}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/Patient/${jeton.id}`
        );

        const patients = await response.json();
        //rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTotalPages(
          !recherche
            ? Math.ceil(patients.length / nombreElementPage)
            : Math.ceil(filteredRdv.length / nombreElementPage)
        );
        setData(!recherche ? patients : filteredRdv);

        setPatient(patients);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1);
      }
    };
    
    fetchRdv();
    
  }, [recherche]);
  
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
      <ToastContainer />
      <div className="consultation_table_btn">
        <Link
         to='/medecin/patient/ajouter'
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
          Ajouter un patient 
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
                  <td>Nom</td>
                  <td>Prénom</td>
                  <td>Age</td>
                  <td>Sexe</td>
                  <td>N° Téléphone</td>
                  <td>Adresse</td>
                   
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {currentData.map((element) => (
                  <tr key={element._id}>
                    <td>{element.nom}</td>
                    <td>{element.prenom} </td>
                    <td>{element.age}</td>
                    <td>{element.sexe}</td>
                    
                    <td>{element.numeroTel}</td>
                    <td>{element.adresse} </td>

                    <td>
                      <div className="action">
                        <Link to={`/medecin/patient/dossier/${element._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg"   
                         width={20}
                         height={20}
                         fill="#637381" 
                         viewBox="0 0 576 512"> 
                        <path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/>
                        </svg>
                        </Link>
                      
                        
                        <Link
                          to={`/medecin/patient/modifier/${element._id}`}
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
                  <button  >OUI</button>
                  <button  >NON</button>
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
}

export default TablePatient;
