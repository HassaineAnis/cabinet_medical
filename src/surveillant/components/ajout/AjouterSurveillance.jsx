import React, { useContext, useRef } from "react";
import Surveillance from "../doc/Surveillance";
import SurveillanceForm from "./formulaire/SurveillanceForm";
import { SurveillanceContext } from "../../../util/context/Context";
import { ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";
const AjouterSurveillance = () => {
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });
  const {
    afficherFiche,
    documentData,
    setDocumentData,
    purfusions,
    setPurfusions,
  } = useContext(SurveillanceContext);
  const supprimerControle = (titre) => {
    const updatedDocumentData = documentData.filter(
      (obj) => obj.titre !== titre
    );
    setDocumentData(updatedDocumentData);
  };
  return (
    <>
      <ToastContainer />

      <div
        className="intervention"
        style={afficherFiche ? { flexDirection: "column" } : {}}
      >
        {afficherFiche ? (
          <div className="section1">
            <Surveillance reference={composantImprimable} />
          </div>
        ) : (
          <div className="section1">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Date:</th>
                  <th style={{ textAlign: "left" }}>jour1:</th>
                  <th style={{ textAlign: "left" }}>jour2:</th>
                  <th style={{ textAlign: "left" }}>jour3:</th>
                  <th style={{ textAlign: "left" }}>jour4:</th>
                </tr>
              </thead>
              <tbody>
                {documentData.map((element, index) => (
                  <tr key={index} style={{ animation: "table 200ms ease" }}>
                    <td className="point">{element.titre}</td>
                    <td>
                      <div>
                        <p>
                          <strong>06H:</strong>{" "}
                          {element.jour1 && element.jour1.h06}
                        </p>

                        <p>
                          <strong>12H:</strong>
                          {element.jour1 && element.jour1.h12}
                        </p>

                        <p>
                          <strong>18H:</strong>
                          {element.jour1 && element.jour1.h18}
                        </p>

                        <p>
                          <strong>00H:</strong>{" "}
                          {element.jour1 && element.jour1.h00}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>
                          <strong>06H:</strong>{" "}
                          {element.jour2 && element.jour2.h06}
                        </p>

                        <p>
                          <strong>12H:</strong>
                          {element.jour2 && element.jour2.h12}
                        </p>

                        <p>
                          <strong>18H:</strong>
                          {element.jour2 && element.jour2.h18}
                        </p>

                        <p>
                          <strong>00H:</strong>{" "}
                          {element.jour2 && element.jour2.h00}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>
                          <strong>06H:</strong>{" "}
                          {element.jour3 && element.jour3.h06}
                        </p>

                        <p>
                          <strong>12H:</strong>
                          {element.jour3 && element.jour3.h12}
                        </p>

                        <p>
                          <strong>18H:</strong>
                          {element.jour3 && element.jour3.h18}
                        </p>

                        <p>
                          <strong>00H:</strong>{" "}
                          {element.jour3 && element.jour3.h00}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p>
                          <strong>06H:</strong>{" "}
                          {element.jour4 && element.jour4.h06}
                        </p>

                        <p>
                          <strong>12H:</strong>
                          {element.jour4 && element.jour4.h12}
                        </p>

                        <p>
                          <strong>18H:</strong>
                          {element.jour4 && element.jour4.h18}
                        </p>

                        <p>
                          <strong>00H:</strong>{" "}
                          {element.jour4 && element.jour4.h00}
                        </p>
                      </div>
                    </td>

                    <td>
                      {" "}
                      <svg
                        onClick={(e) => supprimerControle(element.titre)}
                        style={{ cursor: "pointer" }}
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
                {Object.keys(purfusions).length !== 0 && (
                  <tr>
                    <td>Purfusions</td>
                    <td>{purfusions && purfusions.jour1}</td>
                    <td>{purfusions && purfusions.jour2}</td>
                    <td>{purfusions && purfusions.jour3}</td>
                    <td>{purfusions && purfusions.jour4}</td>
                    <td>
                      <svg
                        onClick={(e) => setPurfusions({})}
                        style={{ cursor: "pointer" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="#637381"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                      </svg>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="formulaire" style={{ alignSelf: "flex-start" }}>
          {" "}
          <SurveillanceForm imprimer={handlePrint} />
        </div>
      </div>
    </>
  );
};

export default AjouterSurveillance;
