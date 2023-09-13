import React, { useRef } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";

import { ToastContainer } from "react-toastify";
import Naissance from "../doc/Naissance";
import { useReactToPrint } from "react-to-print";
import NaissanceForm from "./formulaire/NaissanceForm";
const AjouterNaissance = () => {
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });
  return (
    <>
      <ToastContainer />
      <div className="intervention">
        <div className="section1" style={{ maxWidth: "50%" }}>
          <Naissance reference={composantImprimable} />
        </div>
        <div className="formulaire">
          <NaissanceForm imprimer={handlePrint} />
        </div>
      </div>
    </>
  );
};

export default AjouterNaissance;
