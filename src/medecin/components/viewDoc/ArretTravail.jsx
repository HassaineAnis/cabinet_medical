import React from 'react';
import logo from "../../../assets/logo (1).png" 

const ArretTravail = ({consultation,cible,document}) => {
    return (
        <div className="ordonnance_Container" ref={cible}  >

            

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
            <p style={{margin:"0"}}><strong>Mr/Mme/Melle: </strong> {consultation.patient && consultation.patient.nom} {consultation.patient && consultation.patient.prenom}</p>
            <p style={{margin:"0"}}><strong>Agé(e) de : </strong> {consultation.patient && consultation.patient.age} ans</p>
            <p style={{margin:"0"}}><strong>Demeurant :</strong>{consultation.patient && consultation.patient.adresse}</p>
            <p style={{margin:"0"}}><strong>Nécessite :</strong></p>
            <p style={{alignSelf:"center",border:"1px solid",padding:"0.5rem"}}>Un arrêt de travail de <strong>{document.donnes && document.donnes.nbrJour }</strong> jours sauf complications à dater du <strong>{ document.donnes && new Date(document.donnes.date).toLocaleDateString() }</strong> </p>
        
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
    );
};

export default ArretTravail;