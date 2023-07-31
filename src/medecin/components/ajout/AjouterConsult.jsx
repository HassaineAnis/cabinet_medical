import React, { useRef, useState,useContext } from 'react';
import "../../../style/medecinStyle/dossier/ajouterConsult.css"
import { useNavigate, useParams} from 'react-router-dom';
import Notification from "../../../util/Notifiation"; 
import useModal from "../../../util/hooks/UseModal";
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import { DocumentContext,ConsultationContext } from '../../../util/context/Context';
import { set } from 'date-fns';

 

const AjouterConsult = () => {
    const {documents,setDocuments}= useContext(DocumentContext)
    const {symptome,setSymptome,fichier,setFichier,tension,setTension,poid,setPoid,glycemie,setGlycemie,respiration,setRespiration,montant,setMontant,diagnostic,setDiagnostic} = useContext(ConsultationContext)
    const jetonString = sessionStorage.getItem("user");
    const jeton = JSON.parse(jetonString);
    const {id} = useParams()
     
    
    const [document,setDocument] = useState("")
     
    const { modalIsOpen, openModal, closeModal , modalIsOpen1 , openModal1, closeModal1 } = useModal();

   // const [symptome,setSymptome] = useState([])
    const [symInput,setInput] = useState("")
    const [titre,setTitre] = useState("")
  //  const [fichier,setFichier]= useState([])
    const fichierRef = useRef(null)
   const formRef =useRef(null)
    const tensionRef = useRef(null)
    const poidRef = useRef(null)
    const glycemieRef =useRef(null)
    const respirationRef = useRef(null)

    const montantRef = useRef(null)
    const diagnosticRef = useRef(null) 

    const [nomfichier, setNomFichier] = useState("")
     const navigate = useNavigate()

    const navigation = (url)=>{
        navigate(url)
    }
  
    const ajouterFile = () =>{
        if(titre && fichierRef.current.files[0]){

        
        const objetFile = {
            titre :titre,
            file : fichierRef.current.files[0]
        }
        setFichier([...fichier, objetFile])
        setTitre("")
        setNomFichier("")
        fichierRef.current.value = null
    }else
    console.log("videeeeee")
         

    }

    const ajouterSymtome = ()=>{
        if(symInput){
            setSymptome([...symptome, symInput])
            setInput("");
            
        }
    }
    const supprimerSymptome = (element,index) =>{
        const table = [...symptome]
        table.splice(index,1)
        if(table.length === 0){
            setSymptome([])

        }else{
            setSymptome(table)
        }
        

    }
  const confirmeData =   (e)=>{
    e.preventDefault();
    openModal();
  }
  const envoyerData= async ()=> {
    closeModal()
    const infos = {
        tension: tensionRef.current.value,
        poid : poidRef.current.value,
        glycemie : glycemieRef.current.value,
        respiration:respirationRef.current.value
    }
    
    const formaData = new FormData()

    formaData.append("medecin",jeton.id);
    formaData.append('patient',id);
    formaData.append('symptome',JSON.stringify(symptome));
    formaData.append('montant',montantRef.current.value);
    formaData.append("informationsMedical",JSON.stringify(infos));
    formaData.append("diagnostic",diagnosticRef.current.value);
    formaData.append("date",new Date())
    formaData.append("documentMedical",JSON.stringify(documents))
    fichier.map((element) =>
        formaData.append("fichierExterne", element.file,element.titre)
  )
  /*
  documents.map((element) =>
  formaData.append("documentMedical", element.image,element.titre)
)*/
 
    
    try {
        const response = await fetch("http://localhost:3000/api/consultation", {
          method: "POST",
          body: formaData,
         
        });
  
        if (response.ok) {
         
          Notification.reussite("Consultation ajouter avec succés.")
          champReset()
       
        } else {
          console.error("Erreur lors de la requête");
          Notification.echec("Echec de lors de l'ajout de la consultation.")
          // Gérer les erreurs (afficher un message d'erreur, etc.)
        }
      } catch (error) {
        console.error(error);
        Notification.echec("Echec de la requete.")
  
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
     
  }
  const champReset=()=>{
    formRef.current.reset()
    setSymptome([])
    setFichier([])
    setDocuments([])
    setTension("")
    setRespiration("")
    setPoid("")
    setGlycemie("")
    setMontant("")
    setDiagnostic("")


  }

  


    return (
        <div className='Ajouter_consult'>
            <ToastContainer/>
            <h2>Nouvelle Consultation</h2>
            <form ref={formRef}>

             

            <div className="ajouter_symptome">
                <h3>Symtomes</h3>

              <div className='Ajouter_symptome_input'>
               <input type="text" placeholder='Ajouter un symptome...'   value={symInput}  onChange={(e)=>setInput(e.target.value)} />
              
               <svg  onClick={ajouterSymtome} xmlns="http://www.w3.org/2000/svg" height={25} width={25} viewBox="0 0 448 512"> 
               <path  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
               </svg>
                
               </div>  

                <ul className='liste_symptome'>
                     {symptome.map((element,index)=>
                     (<li key={`${element}-${index}`}>
                        {element}
                        <svg onClick={(e)=>supprimerSymptome(element,index)} xmlns="http://www.w3.org/2000/svg" height={25} width={25} viewBox="0 0 448 512"> 
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                        </svg>
                     </li>)
                     )}
                    
                </ul>
                
                <div className='diagnos'>
                    <div className="input_container">
                        <label htmlFor="montant">Montant:</label>
                        <input type="text" placeholder='Montant DZ...' id='montant' onChange={(e)=>setMontant(e.target.value)} value={montant} ref={montantRef} />

                    </div>

                    <div className="input_container">
                    <label htmlFor="diagnostic">Diagnostic:</label>
                        <input type="text" placeholder='Diagnostic...' id='diagnostic'onChange={(e)=>setDiagnostic(e.target.value)} value={diagnostic} ref={diagnosticRef} />

                        
                    </div>


                </div>
                 
            </div>

            <div className='ajouter_information'>
            <h3>Informations</h3>
            <div className="input_info">
                <div className="input_container">
                    <label htmlFor="tension">Tension Artérielle:</label>
                    <input type="text" id='tension' onChange={(e)=>setTension(e.target.value)} value={tension} ref={tensionRef} />
                </div>
                <div className="input_container">
                    <label htmlFor="poid">Poids: ---KG</label>
                    <input type="text"id='poid' onChange={(e)=>setPoid(e.target.value)} value={poid} ref={poidRef} />
                </div>
                <div className="input_container">
                    <label htmlFor="glycemie">Glycémie: ---G/L</label>
                    <input type="text" id='glycemie' onChange={(e)=>setGlycemie(e.target.value)} value={glycemie} ref={glycemieRef}/>
                </div>
                <div className="input_container">
                    <label htmlFor="respiration">Respiration:</label>
                    <input type="text" id='respiration' onChange={(e)=>setRespiration(e.target.value)} value={respiration} ref={respirationRef}/>
                </div>
            </div>


            </div>
            <div className="ajouter_document">
                <div className='ajouter_document_container'>
                <h3>Documents Medical</h3>
              

              <div className='fichier_externe'>
                 
                      <div className='fichier_externe_input'> 
                       <input type="text" id='titre' placeholder='Titre du document' value={titre} onChange={(e)=>setTitre(e.target.value)}/>
                 
  
                  <div className="input_container">
                      <label htmlFor="documents">
                      <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25}   viewBox="0 0 512 512">
                      <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"/>
                      </svg>
                      </label>
  
                  <input type="text" id="fileName" readOnly   defaultValue={nomfichier} />
                  
                   <input type="file" id='documents'name='documents' onChange={(e)=>setNomFichier(e.target.files[0].name)} ref={fichierRef}/>
                  </div>
                   
                   <div className='btn_ajout' onClick={ajouterFile}>Ajouter 
                   <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill='#fff' viewBox="0 0 576 512"> 
                      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/>
                      </svg>
                   
                   </div>
                   </div>
                   <div className='liste_file'>
                  <ul>
                       {fichier.map((element,index)=>(
                          <li key={`${element}-${index}`}>
                               {element.titre} 
                               <svg xmlns="http://www.w3.org/2000/svg"  height={25} width={25} fill="#fff" viewBox="0 0 384 512">
                                  <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
                               </svg>
                               
                          </li>
                       ))}
                  </ul>
              </div>
  
              
              </div>
  
              <div className='document_interne'>
                  <div className='document_interne_input'>
                  <select name="fichierMedical" id="fichierMedical" value={document} onChange={(e)=>setDocument(e.target.value)}>
                  <option value="">Choisi un document</option>
                      <option value={`/ordonnance/${id}`} >Ordonnance</option>
                      <option value={`/arret_travaille/${id}`} >Arret de travail</option>
                  </select>
                  <div className='btn_ajout' onClick={(e)=>navigation(document)}>Ajouter 
                  <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} fill='#fff' viewBox="0 0 576 512">
                      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z"/>
                  </svg>
                  </div> 
                  
  
                  </div>
                  <div className='liste_file'>
                  <ul>
                       {documents.map((element,index)=>(
                          <li key={`${element}-${index}`}>
                               {element.titre} 
                               <svg xmlns="http://www.w3.org/2000/svg"  height={25} width={25} fill="#fff" viewBox="0 0 384 512">
                                  <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/>
                               </svg>
                               
                          </li>
                       ))}
                  </ul>
              </div>

                </div>
               
              
             
            </div>
        



               <div className="btn">
                <button onClick={confirmeData}>Enregister</button>
                <span onClick={(e)=>navigation(-1)} >Annuler</span>
               </div>
            </div>
            
            </form>
            <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="custom_modal"
           
           style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" ,zIndex:"99" } 
           }}
        >
          <p> Etes vous sur des vouloir supprimer ce rendez-vous?</p>
          <div className="repense">
            <button onClick={envoyerData}>OUI</button>
            <button onClick={closeModal}>NON</button>
          </div>
        </Modal>
        </div>
    );
};

export default AjouterConsult;