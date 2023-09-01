import React, { useRef, useContext } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";

import { ToastContainer } from "react-toastify";

import BabyForm from "./formulaire/BabyForm";
import { SurveilleBabyContext } from "../../../util/context/Context";
import { useReactToPrint } from "react-to-print";

import Baby from "../doc/Baby";
const AjouterBaby = () => {
  const { documentData, setDocumentData, afficherFiche } =
    useContext(SurveilleBabyContext);
  const supprimerMedicament = (titre) => {
    const updatedDesignation = documentData.filter(
      (obj) => obj.titre !== titre
    );
    setDocumentData(updatedDesignation);
  };
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });

  return (
    <>
      <ToastContainer />

      <div
        className="intervention"
        style={afficherFiche ? { flexDirection: "column" } : {}}
      >
        {afficherFiche ? (
          <div className="section1">
            <Baby reference={composantImprimable} />
          </div>
        ) : (
          <div className="section1">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Contole:</th>
                  <th style={{ textAlign: "left" }}>1er jour:</th>
                  <th style={{ textAlign: "left" }}>2eme jour:</th>
                  <th style={{ textAlign: "left" }}>3eme jour:</th>
                </tr>
              </thead>
              <tbody>
                {documentData.map((element, index) => (
                  <tr
                    className="point"
                    key={index}
                    style={{ animation: "table 200ms ease" }}
                  >
                    <td className="point">{element.titre}</td>
                    <td>{element.jour1}</td>
                    <td>{element.jour2}</td>
                    <td>{element.jour3}</td>
                    <td>
                      {" "}
                      <svg
                        style={{ cursor: "pointer" }}
                        onClick={(e) => supprimerMedicament(element.titre)}
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="#637381"
                        viewBox="0 0 512 512"
                      >
                        {" "}
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="formulaire" style={{ alignSelf: "flex-start" }}>
          <BabyForm imprimer={handlePrint} />
        </div>
      </div>
    </>
  );
};

export default AjouterBaby;
