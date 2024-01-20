import React from "react";
import "../../style/laboAM/analyseM.css";
import AnalyseCard from "../components/card/AnalyseCard";

const Analyse = () => {
  return (
    <div className="consultation">
      <div className="consultation__container">
        <div className="analyse">
          <h2>Analyses d'anatomie et cytologie pathologique</h2>
          <div className="analyse_items">
            <AnalyseCard titre="FCU" lien="/laboACP/fcu" />
            <AnalyseCard titre="Histologie" lien="/laboACP/histologie" />
            <AnalyseCard titre="Cytologie" lien="/laboACP/cytologie" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyse;
