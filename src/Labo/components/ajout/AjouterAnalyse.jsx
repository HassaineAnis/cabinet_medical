import React, { useRef } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import { useParams } from "react-router-dom";
import FormulaireTp from "./Form/FormulaireTp";
import FormulaireGs from "./Form/FormulaireGs";
import FormulaireHiv from "./Form/FormulaireHiv";
import Tp from "../documents/BPO/Tp";
import { useReactToPrint } from "react-to-print";
import Hiv from "../documents/BPO/Hiv";
import Gs from "../documents/BPO/Gs";
import FormulaireBpo from "./Form/FormulaireBpo";
import Bpo from "../documents/BPO/Bpo";
const AjouterAnalyse = ({ typeDocument }) => {
  const composantImprimable = useRef(null);
  const { id } = useParams();
  const choiForm = (doc) => {
    if (doc === "tp") {
      return <FormulaireTp id={id} imprimer={handlePrint} />;
    }
    if (doc === "gs") {
      return <FormulaireGs id={id} imprimer={handlePrint} />;
    }
    if (doc === "hiv") {
      return <FormulaireHiv id={id} imprimer={handlePrint} />;
    }
    if (doc === "b.p.o") {
      return <FormulaireBpo id={id} imprimer={handlePrint} />;
    }
  };
  const choiDoc = (doc) => {
    if (doc === "tp") {
      return <Tp reference={composantImprimable} />;
    }
    if (doc === "gs") {
      return <Gs reference={composantImprimable} />;
    }
    if (doc === "hiv") {
      return <Hiv reference={composantImprimable} />;
    }
    if (doc === "b.p.o") {
      return <Bpo reference={composantImprimable} />;
    }
  };
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });
  return (
    <>
      <div className="intervention">
        <div className="section1">{choiDoc(typeDocument)}</div>
        <div className="formulaire">
          {" "}
          <h2 style={{ textTransform: "capitalize", margin: "0" }}>
            Analyse{" "}
            <span style={{ textTransform: "uppercase" }}>{typeDocument}</span>
          </h2>
          {choiForm(typeDocument)}
        </div>
      </div>
    </>
  );
};

export default AjouterAnalyse;
