import React from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../pagination/Pagination";
import "../../../style/adminStyle/table/tableUser.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../style/loader/loader.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {addDaysToDate } from "../../../util/OperationDate" 
 
 

const nombreElementPage = 5;

const TableArchive = () => {
    const [typeEmpolye, setType] = useState("ADMIN");
    const [annee,setAnnee] =useState(new Date().getFullYear())
    

  const {
   
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
      setSearchTerm(event.target.value.trim());

       
      setRecherche(true);
     
    } else {
      setRecherche(false);
    }
  };
  
   
 
  const url =
    typeEmpolye === "personnel"
      ? `http://localhost:3000/api/conge/personnel`
      : `http://localhost:3000/api/conge/user`;

  useEffect(() => {
    


    const fetchUsers = async () => {
      setLoading(true);
       
          
      try {
        const response = await fetch(url);

        const {conge,totalDaysPerUserAndYear} = await response.json();
        //users.sort((a, b) => new Date(b.date) - new Date(a.date));
          
        setFetch(totalDaysPerUserAndYear)
        const congeArchive = conge.filter(element =>element.archive)
        const resultRecherche = congeArchive.filter((element) => {
            const fullName = `${element.employe.nom} ${element.employe.prenom}`.toLowerCase();
            
             
            const prefix = searchTerm.toLowerCase();
                 console.log("ca marche")
          
           
           
             
            return fullName.startsWith(prefix)  
            })
        setTotalPages(recherche?
            Math.ceil(resultRecherche.length / nombreElementPage)
            : 
            Math.ceil(congeArchive.length / nombreElementPage));
        setData(recherche? resultRecherche : congeArchive); 
        
        

       // setFetch(conge);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);

        setCurrentPage(1); 
          
          
        
      }
    };
  
fetchUsers()
  }, [recherche, url,searchTerm]);
 

  

  

  const afficherDetails =  (conge) => {
      setObjet(conge)
    openModal1();
  };

   

  const indiceDepart = (currentPage - 1) * nombreElementPage;
  
  function pageSuivante(page) {
    setCurrentPage(page);
  }

  const listeAnnee =(dates)=>{

     return( dates.reduce((annees, objet) => {
        const annee = new Date(objet.dateSortie).getFullYear();
        if (!annees.includes(annee)) {
          annees.push(annee);
        }
        return annees;
      }, []))

  }
  
  

  
  const filteredData = data.filter((element) => {
    const anneeSortie = new Date(element.dateSortie).getFullYear();
    return anneeSortie === annee;
  });
  const currentData = filteredData.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  ); 
 

    
  
  

  if (erreur) {
    return <div className="user">Erreur de chargement </div>;
  }

  return (
    <div className="user">
      <ToastContainer />
      <h2>Archive Congé</h2>
      <div className="user_table">
        <div className="user_table_btn">
          <Link to={`/admin/conge`} className="btn_ajouter">
       
            Retour
          </Link>
          
          <select
            name="filtre"
            id="filtre"
            value={typeEmpolye}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="ADMIN">Administration</option>
            <option value="Médecin">Médecins</option>
            <option value="personnel">Personnels</option>
            <option value=""></option>
          </select>

          <select
            name="filtreDate"
            id="filtreDate"
            onChange={(e) => setAnnee(parseInt(e.target.value))}
            value={annee}
           >
            {listeAnnee(data).map((annee,index)=>
            (<option key={index} value={annee}> {annee}</option>) 

            )}
             
             
          </select>


           
          
          <SearchBar   onSearchChange={handleSearchChange} />
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
                <td>Date de sortie</td>
                <td>Date d'entrée</td>
                <td>N° jours pris</td>
                 
                

                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {typeEmpolye === "personnel" &&
                currentData
                 
                .map((element) => (
                  <tr key={element._id}>
                    <td>{element.employe.nom}</td>
                    <td>{element.employe.prenom}</td>
                    <td>{new Date(element.dateSortie).toLocaleDateString()}</td>
                    <td>
                      {addDaysToDate(element.dateSortie, element.nombreJour)}
                    </td>

                    <td>{element.nombreJour}</td> 
                    

                    <td>
                      <div className="action">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width={20}
                          height={20}
                          fill="#637381" 
                          onClick={(e)=>afficherDetails(element)}
                          
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                       

                         
                      </div>
                    </td>
                  </tr>
                ))}

              {typeEmpolye !== "personnel" &&
                currentData
                  .filter((role) => role.typeEmpoye === typeEmpolye)
                  .map((element) => (
                    <tr key={element._id}>
                      <td>{element.employe.nom}</td>
                      <td>{element.employe.prenom}</td>
                      <td>
                        {new Date(element.dateSortie).toLocaleDateString()}
                      </td>
                      <td>
                        {addDaysToDate(element.dateSortie, element.nombreJour)}
                      </td>

                      <td>{element.nombreJour}</td>
                   
                    

                      <td>
                        <div className="action">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width={20}
                            height={20}
                            fill="#637381"
                            onClick={(e)=>afficherDetails(element)}
                            
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
              <div className="modal_profil">
                <h2>Détails du Congé</h2>
                <hr />
              

                <div className="modal_profil_info" >
                  <div className="ligne"  style={{justifyContent:"center"}}>
                    <p>Nom : </p>{" "}
                    <span>{currentObjet.employe && currentObjet.employe.nom }.</span>
                  </div>
                  <div className="ligne"  style={{justifyContent:"center"}}>
                    <p>Prénom : </p>{" "}
                    <span>{currentObjet.employe && currentObjet.employe.prenom }.</span>
                  </div>
                  <div className="ligne"  style={{justifyContent:"center"}}>
                    {" "}
                    <p>Date de sortie :</p>
                    <span>{currentObjet &&  new Date(currentObjet.dateSortie).toLocaleDateString()}.</span>{" "}
                  </div>
                  <div className="ligne"  style={{justifyContent:"center"}}>
                    {" "}
                    <p>Date de d'entree:</p>{" "}
                    <span>
                    {currentObjet && addDaysToDate(currentObjet.dateSortie,currentObjet.nombreJour)}.
                      
                    </span>{" "}
                  </div>

                  <div className="ligne"  style={{justifyContent:"center"}}>
                    {" "}
                    <p>Nombre jours pris : </p>{" "}
                    <span>{currentObjet && currentObjet.nombreJour} jour. </span>
                  </div>
                  
                  <div className="ligne"  style={{justifyContent:"center"}}>
                    {" "}
                    <p>Remplaçant:</p>{" "}
                    <span>{ currentObjet.remplacant && currentObjet.remplacant.nom} { currentObjet.remplacant && currentObjet.remplacant.prenom} . </span>
                  </div> 
                   

                  <div className="ligne"  style={{justifyContent:"center"}}>
                    {" "}
                    <p>Nombre de jour Totale pour l'année  {annee} :</p>{" "}
                    <span> {currentObjet.employe &&(fetchData[currentObjet.employe._id][new Date(currentObjet.dateSortie).getFullYear()])} jour. </span>
                  </div> 
                  
                   
                </div>
              </div>

              <div className="modal_btn">
                <button onClick={closeModal1}>Fermer</button>
              </div>
            </Modal>
    </div>
  );
};
 

export default TableArchive;