import React from "react";
import { Link } from "react-router-dom";
import "../../../style/laboAM/card/card.css";
import photo from "../../../assets/medecin.jpg";

const AnalyseCard = ({ abr, titre, description, lien }) => {
  return (
    <div className="card_analyse">
      <div className="section1">
        <img src={photo} alt="font" />
        <h2>{abr}</h2>
      </div>
      <div className="section2">
        <div className="text">
          <h3>{titre}</h3>
          <p>{description}</p>
        </div>

        <Link to={lien} className="btn">
          Voir
        </Link>
      </div>
    </div>
  );
};

export default AnalyseCard;
