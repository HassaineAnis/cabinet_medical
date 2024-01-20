import React from "react";
import "../../style/adminStyle/utilisateurs.css";
import { Link } from "react-router-dom";
import photo from "../../assets/medecin.jpg";

const Utilisateur = () => {
  return (
    <div className="user_page">
      <div className="user_page_container">
        <h2>Gestion Des Utilisateurs</h2>
        <div className="user_items">
          <div className="card_analyse">
            <div className="section1">
              <img src={photo} alt="font" />
            </div>
            <div className="section2">
              <div className="text">
                <h3>Médecins</h3>
                <p>Espace de gestion des medécins</p>
              </div>

              <Link to="/admin/utilisateurs/medecin" className="btn">
                Voir
              </Link>
            </div>
          </div>
          <div className="card_analyse">
            <div className="section1">
              <img src={photo} alt="font" />
            </div>
            <div className="section2">
              <div className="text">
                <h3>Réceptionniste</h3>
                <p>Espace de gestion des receptionnistes</p>
              </div>

              <Link to="/admin/utilisateurs/receptionniste" className="btn">
                Voir
              </Link>
            </div>
          </div>

          <div className="card_analyse">
            <div className="section1">
              <img src={photo} alt="font" />
            </div>
            <div className="section2">
              <div className="text">
                <h3>Pharmaciens</h3>
                <p>Espace de gestion des pharmaciens</p>
              </div>

              <Link to="/admin/utilisateurs/pharmacien" className="btn">
                Voir
              </Link>
            </div>
          </div>

          <div className="card_analyse">
            <div className="section1">
              <img src={photo} alt="font" />
            </div>
            <div className="section2">
              <div className="text">
                <h3>Laborantins d'AM</h3>
                <p>Espace de gestion des laborantins d'AM</p>
              </div>

              <Link to="/admin/utilisateurs/laborantinAM" className="btn">
                Voir
              </Link>
            </div>
          </div>

          <div className="card_analyse">
            <div className="section1">
              <img src={photo} alt="font" />
            </div>
            <div className="section2">
              <div className="text">
                <h3>Laborantins d'ACP</h3>
                <p>Espace de gestion des laborantins d'ACP</p>
              </div>

              <Link to="/admin/utilisateurs/laborantinACP" className="btn">
                Voir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
