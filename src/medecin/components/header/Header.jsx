import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/colombe.png"
import "../../../style/medecinStyle/header/header.css"
import profil from "../../../assets/avatarH.png"
const Header = () => {
    const dataString = sessionStorage.getItem("user")
    const data = JSON.parse(dataString)
    return (
        <header className='header_medecin'>
            <div className='header_medecin_logo'>
                <Link className='lien'> <img src={logo} alt="logo" /></Link>
            </div>

             <nav className='header_medecin_menu'> 
                <ul className='header_medecin_menu_liste'>
                    
                    <li><Link to="/medecin/patient" className='lien'>Patients</Link></li>
                    <li><Link to="/medecin/rendez-vous" className='lien'>Rendez-vous </Link></li>
                    <li><Link to= {`/medecin/profil`} className='lien'>Mon Profil </Link></li>
                     
                </ul>
             </nav>  
              <div className='header_medecin_profil'>
                <div className="header_medecin_profil_info">
                    <span>{`${data.nom} ${data.prenom}`}</span>
                    <span>{data.role}</span>
                </div>
                <img src={data.photo? data.photo : profil} alt="profil" />
                
              </div>
                
            
            
        </header>
    );
}
 

export default Header;