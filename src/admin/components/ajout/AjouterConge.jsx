import React, { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../style/loader/loader.css"
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";

import { ToastContainer } from "react-toastify";
import notification from "../../../util/Notifiation";
 

const AjouterConge = () => {

    const { modalIsOpen, openModal, closeModal } = useModal();
    const formulaireRef = useRef(null)

   const navigate =useNavigate()
    const navigation = () => {
        navigate(-1);
      };

      
      const [isLoading, setLoading] = useState(false);
    const [fetchData, setFetch] = useState([]);
    const [erreur, setErreur] = useState(false);
  const [presonneID,setID]  =useState("")
      const [service,setService]  = useState("")
      const employeRef = useRef(null)
      const dateSortieRef = useRef(null)
     
      
      const nbrJourRef = useRef(null) 
      const remplacantRef = useRef(null)

      useEffect(() => {
        
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const response = await fetch(service ==="personnel"? "http://localhost:3000/api/personnel":`http://localhost:3000/api/users/tout`);
    
            const users = await response.json();
           // users.sort((a, b) => new Date(b.date) - new Date(a.date));
           
            setFetch(users);
          } catch (e) {
            console.log("erreur!!!", e);
            setErreur(true);
          } finally {
            setLoading(false);
           
    
            
          }
        };
  
        
    
        fetchUsers();
   
        
      }, [service] ); 
      console.log(service)
      const verifierData = (e)=>{
        e.preventDefault();
        console.log("id employe: ",employeRef.current.value ,"id remplacant : ",remplacantRef.current.value)
      
         openModal()
      }
      const envoyerData = async (e) => {
        closeModal()
        
      
       const conge = {
        employe: employeRef.current.value,
        nombreJour: parseInt(nbrJourRef.current.value)  ,
        dateSortie: dateSortieRef.current.value,
        typeEmpoye: service ,
        remplacant: remplacantRef.current.value !== "" ? remplacantRef.current.value : null,
      };
        
        
  
   
       try {
         const response = await fetch("http://localhost:3000/api/conge", {
           method: "POST",
           headers: {
            'Content-Type': 'application/json', // En-tête pour indiquer le type de contenu (JSON)
          },
           body: JSON.stringify(conge),
          
         });
   
         if (response.ok) {

           Notification.reussite(`congé ajouté avec succès`);
          //  formulaireRef.current.reset();
         } else {
          // const erreurData = await response.json();


           Notification.echec("Erreur lors du chargement du congé.");
   
           console.error(
             "Une erreur s'est produite lors de l'enregistrement du congé. Veuillez réessayer."
           );
         }
       } catch (error) {
         Notification.echec(
           "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
         );
       }
     };
      
     

      
      if(erreur){
        return ( <div className="user">Erreur de chargement </div>)
      }
    return (<> 
      <ToastContainer/>
        <div className="container_form">
        
     
        <h2>Ajouter un Congé</h2>
        <hr />
        {isLoading? <div className="spinner"  ></div>:
        
        (
            <form  onSubmit={verifierData} ref={formulaireRef}   >
          
   
            <div className="input_section">
              <div className="input_conteneur">
                <label htmlFor="service">Service:</label>
                <select name="service" id="service" required onChange={(e)=>setService(e.target.value)} value={service}>
                  <option value="">-- Choisissez le service --</option>
                  <option value="ADMIN">Administration</option>
                  <option value="Médecin">Médecin</option>
                  <option value="personnel">Personnel</option>
                </select>
              </div>

              {service === "personnel" ?
              (
                <div className="input_conteneur">
                <label htmlFor="nom">Nom/Prénom</label>
                <select name="nom" id="nom" required  ref={employeRef} onChange={(e)=>setID(e.target.value)}>
                  <option value="">-- Choisissez une personne --</option>
                  {fetchData.map((element,index)=>(
                    <option key={index} value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
             
              </div>):
              (
                <div className="input_conteneur">
                <label htmlFor="nom">Nom/Prénom</label>
                <select name="nom" id="nom" required  ref={employeRef} onChange={(e)=>setID(e.target.value)}>
                  <option value="">-- Choisissez une personne --</option>
                  {fetchData.filter(filtre=>filtre.role === service).map((element,index)=>(
                    <option key={index} style={{"textTransform":'capitalize'}}value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
            
              </div>
              )

              

              }
  
            
              <div className="input_conteneur">
                <label htmlFor="date">Date De Sortie</label>
                <input type="date" id="date"      ref={dateSortieRef}/>
              </div>
    
              
    
              
     
    
              <div className="input_conteneur">
                <label htmlFor="jour">Nombre de jours</label>
                <input
                 ref={nbrJourRef} 
                  type="text"
                  id="jour"
                   
                  
                  pattern="[0-9]*"
                  title="il doit contenir des nombres"
                   
                  placeholder="Ex: 25"
                />
              </div>
  
               
              {service === "personnel" ?
              (
                <div className="input_conteneur">
                <label htmlFor="remplacant">Remplaçants</label>
                <select name="remplacant" id="remplacant" ref={remplacantRef}>
                  <option value="" >-- Choisissez un remplaçant --</option>
                  {fetchData.filter(filtre=>filtre._id!== presonneID).map((element,index)=>(
                    <option key={element._id} value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
            
              </div>):
              (
                <div className="input_conteneur">
                <label htmlFor="remplacant">Remplaçants</label>
                <select name="remplacant" id="remplacant" ref={remplacantRef} >
                  <option value="">-- Choisissez une remplaçant --</option>
                  {fetchData.filter(filtre=>filtre.role===service && filtre._id !== presonneID).map((element,index)=>(
                    <option key={element._id} style={{"textTransform":'capitalize'}}value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
            
              </div>
              )

              

              }
              
    
             
         
               
              
               
             
    
              
            </div>
            <div className="btn">
              <button type="submit" >Enregitrer</button>
             
              <span onClick={navigation}>Annuler</span>
            </div>
          </form>

        )}
        <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="custom_modal"
            style={{
              overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "2" },
            }}
          >
            <p> Voulez-vous confirmé cet ajout? </p>
            <div className="repense">
              <button onClick={envoyerData}>OUI</button>
              <button onClick={closeModal}>NON</button>
            </div>
          </Modal>
       
      </div>
      </>
    );
};

export default AjouterConge;