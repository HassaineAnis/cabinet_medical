import React, { useRef, useContext } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";

import { ToastContainer } from "react-toastify";

import NavetteForm from "./formulaire/NavetteForm";
import { NavetteContext } from "../../../util/context/Context";
import { useReactToPrint } from "react-to-print";
import Navette from "../doc/Navette";

const AjouterNavette = () => {
  const { afficherFiche, setAfficherFiche, designation, setDesignation } =
    useContext(NavetteContext);
  const supprimerMedicament = (medicament) => {
    const updatedDesignation = designation.filter(
      (obj) => obj.medicament !== medicament
    );
    setDesignation(updatedDesignation);
  };
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });

  return (
    <>
      <ToastContainer />

      <div className="intervention">
        {afficherFiche ? (
          <div className="section1">
            <Navette reference={composantImprimable} />
          </div>
        ) : (
          <div className="section1">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Medicament:</th>
                  <th style={{ textAlign: "left" }}>Matérnité:</th>
                  <th style={{ textAlign: "left" }}>Bloc:</th>
                  <th style={{ textAlign: "left" }}>Hospitalisation:</th>
                </tr>
              </thead>
              <tbody>
                {designation.map((element, index) => (
                  <tr key={index} style={{ animation: "table 200ms ease" }}>
                    <td className="point">{element.medicament}</td>
                    <td>{element.maternite}</td>
                    <td>{element.bloc}</td>
                    <td>{element.hospital}</td>
                    <td>
                      {" "}
                      <svg
                        style={{ cursor: "pointer" }}
                        onClick={(e) => supprimerMedicament(element.medicament)}
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
          {" "}
          <NavetteForm
            imprimer={handlePrint}
            afficherFiche={afficherFiche}
            handleAfficher={setAfficherFiche}
          />
        </div>
      </div>
    </>
  );
};

export default AjouterNavette;
