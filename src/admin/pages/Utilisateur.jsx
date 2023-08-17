import React from "react";
import "../../style/adminStyle/utilisateurs.css";
import { Link } from "react-router-dom";

const Utilisateur = () => {
  return (
    <div className="user_page">
      <div className="user_page_container">
        <h2>Gestion Des Utilisateurs</h2>
        <div className="user_items">
          <div className="card">
            <div className="image_font"></div>

            <div className="info">
              <h3>Médecins</h3>
              <p>Espace de gestion des medécins</p>

              <Link to="/admin/utilisateurs/medecin" className="btn">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="image_font"></div>

            <div className="info">
              <h3>Réceptionniste</h3>
              <p>Espace de gestion des receptionnistes</p>

              <Link to="/admin/utilisateurs/receptionniste" className="btn">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="image_font"></div>

            <div className="info">
              <h3>Pharmaciens</h3>
              <p>Espace de gestion des pharmaciens</p>

              <Link to="/admin/utilisateurs/pharmacien" className="btn">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="image_font"></div>

            <div className="info">
              <h3>Laborantins d'AM</h3>
              <p>Espace de gestion des laborantins d'AM</p>

              <Link to="/admin/utilisateurs/laborantinAM" className="btn">
                Voir tout
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="image_font"></div>

            <div className="info">
              <h3>Laborantins d'ACP</h3>
              <p>Espace de gestion des laborantins d'ACP</p>

              <Link to="/admin/utilisateurs/pharmacienACP" className="btn">
                Voir tout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
