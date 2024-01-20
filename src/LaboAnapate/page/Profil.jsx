import React from "react";
import "../../style/medecinStyle/consultation.css";
import MonProfil from "../components/profil/MonProfil";
import { ToastContainer } from "react-toastify";

const Profil = (props) => {
  return (
    <div className="consultation">
      <ToastContainer />
      <div className="consultation__container">
        <MonProfil />
      </div>
    </div>
  );
};

export default Profil;
