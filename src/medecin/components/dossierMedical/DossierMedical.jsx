import React from "react";
import "../../../style/medecinStyle/dossier/dossierMedical.css";
import TableRdvPatient from "../tables/TableRdvPatient";
import TableConsultation from "../tables/TableConsultation";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../style/loader/loader.css"


function DossierMedical(props) {
 const {id}=useParams()
  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState([]);
  const [erreur, setErreur] = useState(false);

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
 
   if (erreur){
    return(
        <div>Erreur de chargement</div>
    )
   }

  return (
    <div className="dossier">
      <h2>Dossier du patient</h2>
      {isLoading? 
       (<div style={{alignSelf:"center"}} className="spinner"></div>)
       :  
       (
        <div className="dossier_container">
        <div className="information_personnel">
            <div className="container">
            <h3>Informations personnel</h3>
          <div className="info">
            <span>Nom :</span>
            <span>{patient.nom}</span>
          </div>
          <div className="info">
            <span>Prénom :</span>
            <span>{patient.prenom}</span>
          </div>
          <div className="info">
            <span>Age :</span>
            <span>{patient.age} ans</span>
          </div>
          <div className="info">
            <span>Sexe :</span>
            <span>{patient.sexe}</span>
          </div>
          <div className="info">
            <span>Adresse :</span>
            <span>{patient.adresse}</span>
          </div>
          <div className="info">
            <span>N° Téléphone :</span>
            <span>{patient.numeroTel}</span>
          </div>

            </div>
        
        </div>

        <div className="table_rdv">
          <h3> Rendez-vous</h3>
          <TableRdvPatient id = {patient._id} />
        </div>

        <div className="table_consult">
          <h3> Consultations</h3>
          <TableConsultation id = {patient._id}/>
        </div>
      </div>
       )
    }

      
    </div>
  );
}

export default DossierMedical;
