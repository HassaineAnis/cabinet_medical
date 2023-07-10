import React from 'react';
import "../../style/medecinStyle/consultation.css"
 import MonProfil from '../components/profil/MonProfil';
import { specialiteMedecin} from "../../data/ListMedecin"

const Profil = (props) => {
    return (
        <div className="consultation">
      <div className="consultation__container">
            <MonProfil specialite={specialiteMedecin}/>
        </div>
        </div>
    );
}

export default Profil;