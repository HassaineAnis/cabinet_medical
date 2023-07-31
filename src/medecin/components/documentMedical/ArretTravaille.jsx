import React, { useRef } from 'react';
import logo from "../../../assets/logo (1).png"
import "../../../style/medecinStyle/documentMedical/ordonnance.css"
import { useState,useEffect,useContext } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import "../../../style/loader/loader.css"
import { useReactToPrint } from 'react-to-print';
import { DocumentContext } from '../../../util/context/Context';
 

 

const ArretTravaille = () => {
    const {id} = useParams()
    const {documents,setDocuments} = useContext(DocumentContext)
    const componentRef = React.useRef();
    const formRef = useRef(null)
    const [date,setDate] = useState("")
    const dateRef = useRef(null)
    const jourRef = useRef(null)
   
    const [jour,setJour] = useState("")

    const [isLoading, setLoading] = useState(false);
    const [patient, setPatient] = useState([]);
    const [erreur, setErreur] = useState(false);
    const navigate = useNavigate()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
       
    
      });
    


   
  

    useEffect(() => {
    
        const fetchPatient = async () => {
          setLoading(true);
          try {
            const response = await fetch(
              `http://localhost:3000/api/Patient/details/${id}`
            );
    
            const patient = await response.json();
           
            
            setPatient(patient);
    
             
          } catch (e) {
            console.log("erreur!!!", e);
            setErreur(true);
          } finally {
            setLoading(false);
    
           
          }
        };
        
        fetchPatient();
        
      }, []);

      const ajouterData=()=>{
        
        if(dateRef.current.value  && jourRef.current.value ){
          if(jourRef.current.value === 0){
            return console.log("nbr jours null!!")

          }
          setJour(jourRef.current.value)
          setDate(dateRef.current.value)
        formRef.current.reset()

        
          

           
        }     

        else{
          console.log("nonnn")
        }
        
    }

    const saveDocument =()=>{
      const documentData=  {
        titre:"arret de travail",
        donnes :{date:date, nbrJour:jour}
      }
      setDocuments([...documents,documentData])
      navigate(-1)

     } 
     
     const envoie =(e)=>{
      e.preventDefault()
    } 

      if(erreur)
      {
        return(
            <div className='ordonnance'>
                Erreur de chargement.
            </div>
        )
      }

    return (
        <div className='ordonnance'>
              {isLoading? <div className='spinner'></div> :
            (
                <> 

            
<div className="ord_c"> 
                <div className="ordonnance_Container" ref={componentRef}  >

            

<div className='section1'>
    <div className='entete'>
        <div className='entete_text'>
         <h3  >Etablissement Hospitalier Privé La Colombe</h3>
         <hr/>
         <h4>Le progrès et l'humanisme au service de la santé
         <br/>
          المؤسسة الإستشفائية الخاصة لاكولومب
         <br />
         التقدم و الإنسانية في خدمة الصحة
         </h4>
         </div>
         <img src={logo} alt="Logo Administration"/>

    </div>
    <div className='section1_info'style={{justifyContent:"flex-end"}} >
        

        <div className='date'  >
            <p ><strong> DBK, le :</strong> <span>{new Date().toLocaleDateString()}</span></p>
        </div>

    </div>

    <div className='section1_titre'>
                    
    
        <h3 style={{textDecoration:"underline"}}>CERTIFICAT D'ARRET DE TRAVAIL</h3>
    </div>

    <div className='traitement'>
        <p>Je soussigné, docteur en Médecine,

Certifie, que l'état de santé de:</p>
<div style={{display:"flex",flexDirection:"column",gap:"1rem" }} > 
    <p style={{margin:"0"}}><strong>Mr/Mme/Melle: </strong>{patient.nom} {patient.prenom}</p>
    <p style={{margin:"0"}}><strong>Agé(e) de : </strong> {patient.age} ans</p>
    <p style={{margin:"0"}}><strong>Demeurant :</strong>{patient.adresse}</p>
    <p style={{margin:"0"}}><strong>Nécessite :</strong></p>
    <p style={{alignSelf:"center",border:"1px solid",padding:"0.5rem"}}>Un arrêt de travail de <strong>{jour? jour:"--"}</strong> jours sauf complications à dater du <strong>{date? new Date(date).toLocaleDateString():"--/--/----"}</strong> </p>

</div>
    
    </div>


</div>

<div className="section2">
    <hr />
    <p>Etablissement Hospitalier Privé la Colombe Touares II Draa Ben Khedda  <br />
             15100 Tizi-Ouzou
             <br />
        Mobile: 0550 96 95 65 - Tél/Fax: 026 43 32 22 / 026 43 33 22 </p>
</div>

</div>
 
</div>
 
<form className='no-print' ref={formRef} onSubmit={envoie} >
       
       <div className='ajout_traitement' style={{flexDirection:"column"}}>
        <div style={{display:"flex" ,gap:"1rem"}}>
        <div className="input_container">
             <label htmlFor="date">
                Date début:
             </label> 
             <input type="date" id="date" ref={dateRef}   />
            
   </div>
    <div className="input_container">
             <label htmlFor="jours">
                Nombre de jours:
             </label> 
              <input type="number" id="jours"   ref={jourRef} />
   </div>
 
        </div>
     

      
   
   <span onClick={ajouterData} >Ajouter</span>
   </div>
   <hr/>
  
   <div className="btn">
   <div className='btn_1'>
    <button onClick={saveDocument}  >Enregistré</button>
   <button    onClick={(e)=>{navigate(-1)}}>Annuler</button>
   </div>
   <div className='print' onClick={handlePrint}>

       Imprimer 
       <svg  xmlns="http://www.w3.org/2000/svg" height={30} width={30} viewBox="0 0 512 512"   fill='#fff'>  
   <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
   </svg> 

   </div>
    

    
</div>
  


   </form>
             
</>)}
 
        </div>
    );
};

export default ArretTravaille;