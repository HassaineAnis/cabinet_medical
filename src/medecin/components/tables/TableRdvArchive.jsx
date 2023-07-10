import React, { useState,useEffect } from 'react';
import SearchBar from '../serchBar/SearchBar';
import Pagination from '../../../admin/components/pagination/Pagination';
import "../../../style/medecinStyle/consultation.css"
import { Link } from 'react-router-dom';
 
 
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
 
 
import "../../../style/medecinStyle/popup/modalRdv.css"

const nombreElementPage = 8;
const TableRdvArchive = () => {
    const jetonString = sessionStorage.getItem("user");
    const jeton = JSON.parse(jetonString); 
  
    const {modalIsOpen1 , openModal1, closeModal1 } = useModal();
    const [currentObjet,setObjet]=useState({})
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
   
  
   
    const [isLoading, setLoading] = useState(false);
    const [rendeVous, setRendeVous] = useState([]);
    const [erreur, setErreur] = useState(false);
  
    const [searchTerm, setSearchTerm] = useState("");
    const [recherche ,setRecherche] = useState(false)
  
    const handleSearchChange = (event) => {
      if(event.target.value !==""){
      setSearchTerm(event.target.value);
      setRecherche(true)
      }else{
        setRecherche(false)
      }
    };
    
    
   
     const  filteredRdv = rendeVous.filter((rdv) => {
        const fullName = `${rdv.nom} ${rdv.prenom}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      });
  
      useEffect(() => {
       
      const fetchRdv = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3000/api/rendez-vous/${jeton.id}`);
    
          const rendeVous = await response.json();
          rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
          setTotalPages(!recherche ? Math.ceil(rendeVous.length / nombreElementPage):Math.ceil(filteredRdv.length /nombreElementPage));
          setData(!recherche ? rendeVous:filteredRdv );
    
          setRendeVous(rendeVous);
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
      const currentData =  data.slice(
        indiceDepart,
        indiceDepart + nombreElementPage
      );
      
      function pageSuivante(page) {
        setCurrentPage(page);
      } 
  
      const afficherDetails = (data)=>{
        openModal1()
    
        console.log(data)
        
      }

      if(erreur){
        return(
            <div className="consultation_table">erreur de chargement</div>
        )
      }
    return (
        <div className="consultation_table">
         
        <h2>Rendez-vous archivé</h2>
      <div className="consultation_table_btn" > 
       <Link style={{textDecoration:'none'}} to="/medecin/rendez-vous" className='btn_archive'> 
       
        Retour
       </Link>

     <SearchBar  onSearchChange={handleSearchChange} /> 
     </div> 
     {isLoading? (<div style={{alignSelf:"center"}} className="spinner"></div>):
     
     
    ( 
      <>
      

   <div className="consultation_table__content">
    
      <table className="table">
      <thead>
        <tr className="table_entete">
          <td>Nom</td>
          <td>Prénom</td>
          <td>Age</td>
          <td>date</td>
          <td>Motif</td>
          <td>Status</td>
          <td>Details</td>
          
        </tr>
      </thead>
      <tbody>
     
           
           {
            currentData.filter(element =>  element.status ).map((element)=>(


     
           
              <tr key={element._id} >
              <td>{element.nom}</td>
              <td>{element.prenom} </td>
              <td>{element.age}</td>
              <td> {new Date(element.date).toLocaleDateString() }  </td>
              <td>{element.motif} </td>
              <td style={{color:"green"}}> Passé</td>
               
               
              
              
               
              <td>
                <div className="action"> 
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={20}
                      height={20}
                      fill="#637381"
                      onClick={(e)=>{
                        setObjet(element);
                        afficherDetails(element)
                      }}
                   
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                  
               
                 
               
                </div>
              </td>
            </tr> ))}
      
        
      </tbody>
    

        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={closeModal1}
          className="rdv"
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" ,zIndex:"99"} }}
        >
          <div className="modal_profil" >
            <h2>Détails du Rendez-Vous</h2>
            <hr />
           
            
             
            <div className="modal_profil_info">
              <div className="ligne"><p>Nom : </p> <span>{  currentObjet.nom}</span></div>
               <div className="ligne"><p>Prénom : </p> <span>{ currentObjet.prenom}</span></div>
               <div className="ligne"> <p>Sexe :</p><span>{currentObjet.sexe}</span>  </div>
                
               
               <div className="ligne"> <p>Adresse : </p> <span>{currentObjet.adresse} </span></div>
               <div className="ligne"> <p>Numéro De Téléphone :</p> <span>{currentObjet.numeroTel}</span></div>
               <div className="ligne"> <p>Date du Rendez-vous :</p> <span>{new Date( currentObjet.date).toLocaleDateString()}</span></div>
               <div className="ligne"><p>Motif de rendez-vous : </p> <span>{  currentObjet.motif}</span></div>
               {currentObjet.motif === "Chérurgie" &&  <div className="ligne"> <p>Type de Chérurgie :</p><span> {currentObjet.typeCherurgie} </span>  </div> } 
               {currentObjet.motif === "Accouchement" &&  <div className="ligne"> <p>Type d'Accouchement :</p><span> {currentObjet.typeAccouchement} </span>  </div> } 
              
             </div>
          </div>
          
          <div className="modal_btn">
            <button onClick={closeModal1}>Fermer</button>
          
             <div className='confirme'> 
              <span> Rendez-vous passé</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#637381" height={30} width={30} viewBox="0 0 448 512">
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>
              </div>
             
               
             
            
          
           
            
          </div>
        </Modal>
    </table>
    <Pagination
    pageActuel={currentPage}
    totalPage={totalPages}
    cliqueAvancer={pageSuivante}
      
    />
    </div> </>)}

    </div>
    );
}

export default TableRdvArchive;