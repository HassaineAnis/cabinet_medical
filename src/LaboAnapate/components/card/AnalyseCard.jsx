import React from "react";
import { Link } from "react-router-dom";
import "../../../style/laboACP/card/card.css";

const AnalyseCard = ({ titre, lien }) => {
  return (
    <div className="analyseAcp">
      <h3>{titre}</h3>
      <Link className="lien" to={lien}>
        Voir
      </Link>
    </div>
  );
};

export default AnalyseCard;
