import React, { useRef } from 'react';
import logo from "../../../assets/logo (1).png" 
const Ordonnance = ({consultation,cible,document}) => {

  
    return (
       
<div className="ordonnance_Container" ref={cible}   >

            

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
         <img src={logo } alt="Logo Administration"/>

    </div>
    <div className='section1_info' >
        <div className='info'> 
        <p><strong>Nom :</strong> <span>{consultation.patient && consultation.patient.nom}</span></p>
        <p><strong>Prénom :</strong> <span>{consultation.patient && consultation.patient.prenom }</span></p>
        <p><strong>Age :</strong> <span>{consultation.patient && consultation.patient.age } ans</span></p>
        </div>

        <div className='date'>
            <p ><strong> DBK, le :</strong> <span>{ consultation.date && new Date(consultation.date).toLocaleDateString()}</span></p>
        </div>

    </div>

    <div className='section1_titre'>
    <h3>وصفة طبية    </h3>                   
    
        <h3>Ordonnace</h3>
    </div>

    <div className='traitement'>
        <ul>
            {
                document.donnes&& document.donnes.map((data,index)=>
                (<li key={index}>{data}</li>)
                )
            }
        </ul>
       {/* <ul>
        {consultation.documentMedical && consultation.documentMedical.map((data, index) => (
  <ul key={index}>
    {data.donnes.map((element, index) => (
      <li key={index}>{element}</li>
    ))}
  </ul>
))}
            
        
    </ul>*/}
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

export default Ordonnance;