import React from "react";
import "../../../style/adminStyle/header.css";
  
import colombe from "../../../assets/colombe.png"
import avatarFemme from "../../../assets/admin.png";
 
import { useNavigate } from "react-router-dom";
 
 
function Header() {
  const navigate = useNavigate();
  const dataString = sessionStorage.getItem('user')
  const data = JSON.parse(dataString)
 

  return (
    <header className="header">
      <div className="header_container">
      <div className="menu_logo">
        <img src={colombe} alt="logo" />
        <h1>E.H.P <br></br> LA COLOMBE</h1>
      </div>
         

        <div className="header_container_profil" onClick={()=>navigate("/admin/profile")}>
          <div className="profil_info">
            <span>{`${ data.nom } ${ data.prenom}`}</span>
            <span>{ data.role}</span>
          </div>

          <img
            className="avatar"
            src={data.photo? data.photo : avatarFemme}
            alt="avatar"
            height="64px"
            width="64px"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
