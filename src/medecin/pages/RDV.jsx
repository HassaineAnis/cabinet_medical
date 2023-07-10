import React,{useContext, useEffect,useState} from "react";
import "../../style/medecinStyle/consultation.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import '../../style/loader/loader.css'
import { RechargeContext } from "../../util/context/Context";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "../components/serchBar/SearchBar";
import Pagination from "../../admin/components/pagination/Pagination";

Modal.setAppElement("#root");
const nombreElementPage = 6;
 
const RDV = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
   
  
  const {recharge,setRecharge} = useContext(RechargeContext)
    const [isLoading, setLoading] = useState(false);
    const [rendeVous, setRendeVous] = useState([]);
    const [erreur, setErreur] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [objetCourante,setObjet] =useState({})
  
     //bar de rechereche
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
     
  
    const supprimerRDV = async (id) => {
      try {
        const reponse = await fetch(
          `http://localhost:3000/api/rendez-vous/${id}`,
          {
            method: "DELETE",
          }
        );
  

        if (reponse.ok) {
          notificationReussite();
        }
      } catch (error) {
        notificationErreur();
        console.log(error);
      }
    };

    const notificationReussite = () => {
      closeModal();
      toast.success("Suppression reussit!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setTimeout(() => {
        setRecharge(true);
      }, 1100);
    };
    const notificationErreur = () => {
      closeModal();
      toast.error("Echéc de la suppression!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    };
    
  
    function openModal() {
      setModalIsOpen(true);
    }
  
    function closeModal() {
      setModalIsOpen(false);
    }
   
  
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/rendez-vous");
  
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
        setRecharge(false)
         
        setCurrentPage(1);
   
      
      }
    };
  
    fetchRdv();
  }, [recharge,recherche]);
  
   
  
    
  const navigate = useNavigate()
  const lien =useLocation()
  const navigation=()=>{
      navigate("/medecin/rendez-vous/ajouter")
  }
  
  const afficher = () => {
      return lien.pathname === "/medecin/rendez-vous/ajouter" ? false : true;
    }
   

    const indiceDepart = (currentPage - 1) * nombreElementPage;
    const currentData =  data.slice(
      indiceDepart,
      indiceDepart + nombreElementPage
    );
    
    function pageSuivante(page) {
      setCurrentPage(page);
    }




   


    return (
             
    <div className="consultation">
    <ToastContainer/>
      {afficher()? (
      <div className="consultation__container"> 
    <h2>Mes rendez-vous</h2>
    
    <div className="consultation_table">
      <div className="consultation_table_btn" > 
      <button onClick={(e)=>navigation()} >
        
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
        Ajouter une nouveau rendez-vous
      </button>
     <SearchBar  onSearchChange={handleSearchChange}  /> 
     </div>
      {isLoading? (<div style={{alignSelf:"center"}} className="spinner"></div>

      ): (
        <div className="consultation_table__content">
      <table className="table">
      <thead>
        <tr className="table_entete">
          <td>Nom</td>
          <td>Prénom</td>
          <td>Age</td>
          <td>Sexe</td>
          <td>date</td>
          <td>Motif</td>
          <td>Actions</td>
          
        </tr>
      </thead>
      <tbody>
        {
           
          
            currentData.map((rdv)=>
            
            (
            
              <tr key={rdv._id} >
              <td>{rdv.nom}</td>
              <td>{rdv.prenom }</td>
              <td>{rdv.age}</td>
              <td>{rdv.sexe}</td>
              <td>{new Date(rdv.date).toLocaleDateString() }</td>
              <td>{rdv.motif}</td>
              
              
             
              <td>
                <div className="action"> 
                <svg
   
                  width={25}
                  height={25}
                  fill="#637381"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z" />
                  <path d="M5 17.997h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71l-2.74-2.74a2 2 0 0 0-2.66-.07l-9 9a2 2 0 0 0-.57 1.21L4 16.907a1 1 0 0 0 1 1.09Zm10.27-14L18 6.727l-2 1.95-2.68-2.68 1.95-2Z" />
                </svg>
                <svg
                 onClick={(e)=>{
                   openModal();
                   setObjet(rdv)
   
                  }}
                  width={25}
                  height={25}
                  fill="#637381"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.5 3h-5l-1 1H5v2h14V4h-3.5l-1-1Z" />
                  <path d="M6 7h12v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7Z" />
                  <path d="M10 10h4v2h-4v-2Z" />
                  <path d="M10 13h4v2h-4v-2Z" />
                  <path d="M10 16h4v2h-4v-2Z" />
                </svg>
                </div>
              </td>
            </tr>))}
      
        
      </tbody>
    </table>
    <Pagination
      pageActuel={currentPage}
      totalPage={totalPages}
      cliqueAvancer={pageSuivante}
    />
    </div>
    )}
     
    </div>
    <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
        >
          <p>
            
            Voulez vous supprimer ce rendez-vous
           
          </p>
          <div className="repense">
            <button onClick={() => supprimerRDV(objetCourante._id)}>
              OUI
            </button>
            <button onClick={closeModal}>NON</button>
          </div>
        </Modal>
    </div>)
    :
    <Outlet />}
  </div>
);
}

export default RDV;