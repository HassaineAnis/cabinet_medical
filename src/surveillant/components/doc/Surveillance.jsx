import React, { useContext } from "react";
import "../../../style/surveillantStyle/doc/navette.css";
import { listeControle } from "../../../data/surveillant/ListeControle";
import { SurveillanceContext } from "../../../util/context/Context";
import { addDaysToDate } from "../../../util/OperationDate";
const Surveillance = ({ reference, data }) => {
  const {
    groupage,

    documentData,

    nom,

    prenom,

    age,

    diagnostic,

    chirurgien,

    intervention,

    reanimateur,

    heure,

    date,
    purfusions,
  } = useContext(SurveillanceContext);

  const afficherDocumentData = (titre) => {
    return documentData.find((item) => item.titre === titre);
  };
  const afficherData = (titre, data) => {
    return data.find((item) => item.titre === titre);
  };
  return (
    <div className="navette" style={{ position: "relative" }} ref={reference}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Fiche de surveillance et de traitement</h3>

        <p style={{ textAlign: "right", position: "absolute", right: "1rem" }}>
          Groupage:<strong>{data ? data.groupage : groupage}</strong>
        </p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th colSpan={4}>
              {data
                ? new Date(data.date).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </th>
            <th colSpan={4}>
              {data
                ? addDaysToDate(data.date, 1)
                : date && addDaysToDate(date, 1)}
            </th>
            <th colSpan={4}>
              {" "}
              {data
                ? addDaysToDate(data.date, 2)
                : date && addDaysToDate(date, 2)}
            </th>
            <th colSpan={4}>
              {" "}
              {data
                ? addDaysToDate(data.date, 3)
                : date && addDaysToDate(date, 3)}
            </th>
          </tr>
          <tr>
            <th>Horaires</th>
            <th>06h</th>
            <th>12h</th>
            <th>18h</th>
            <th>00h</th>

            <th>06h</th>
            <th>12h</th>
            <th>18h</th>
            <th>00h</th>

            <th>06h</th>
            <th>12h</th>
            <th>18h</th>
            <th>00h</th>

            <th>06h</th>
            <th>12h</th>
            <th>18h</th>
            <th>00h</th>
          </tr>
        </thead>
        <tbody>
          {listeControle.map((element, index) => (
            <tr key={index}>
              <td>{element}</td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour1 &&
                    afficherData(element, data.documentData).jour1.h06
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour1 &&
                    afficherDocumentData(element).jour1.h06}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour1 &&
                    afficherData(element, data.documentData).jour1.h12
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour1 &&
                    afficherDocumentData(element).jour1.h12}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour1 &&
                    afficherData(element, data.documentData).jour1.h18
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour1 &&
                    afficherDocumentData(element).jour1.h18}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour1 &&
                    afficherData(element, data.documentData).jour1.h00
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour1 &&
                    afficherDocumentData(element).jour1.h00}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour2 &&
                    afficherData(element, data.documentData).jour2.h06
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour2 &&
                    afficherDocumentData(element).jour2.h06}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour2 &&
                    afficherData(element, data.documentData).jour2.h12
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour2 &&
                    afficherDocumentData(element).jour2.h12}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour2 &&
                    afficherData(element, data.documentData).jour2.h18
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour2 &&
                    afficherDocumentData(element).jour2.h18}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour2 &&
                    afficherData(element, data.documentData).jour2.h00
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour2 &&
                    afficherDocumentData(element).jour2.h00}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour3 &&
                    afficherData(element, data.documentData).jour3.h06
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour3 &&
                    afficherDocumentData(element).jour3.h06}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour3 &&
                    afficherData(element, data.documentData).jour3.h12
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour3 &&
                    afficherDocumentData(element).jour3.h12}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour3 &&
                    afficherData(element, data.documentData).jour3.h18
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour3 &&
                    afficherDocumentData(element).jour3.h18}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour3 &&
                    afficherData(element, data.documentData).jour3.h00
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour3 &&
                    afficherDocumentData(element).jour3.h00}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour4 &&
                    afficherData(element, data.documentData).jour4.h06
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour4 &&
                    afficherDocumentData(element).jour4.h06}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour4 &&
                    afficherData(element, data.documentData).jour4.h12
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour4 &&
                    afficherDocumentData(element).jour4.h12}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour4 &&
                    afficherData(element, data.documentData).jour4.h18
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour4 &&
                    afficherDocumentData(element).jour4.h18}
              </td>
              <td>
                {data && data.documentData
                  ? afficherData(element, data.documentData) &&
                    afficherData(element, data.documentData).jour4 &&
                    afficherData(element, data.documentData).jour4.h00
                  : afficherDocumentData(element) &&
                    afficherDocumentData(element).jour4 &&
                    afficherDocumentData(element).jour4.h00}
              </td>
            </tr>
          ))}

          <tr>
            <td>Compositions des purfusions</td>
            <td colSpan={4}>
              {data
                ? data.purfusions && data.purfusions.jour1
                : purfusions && purfusions.jour1}
            </td>
            <td colSpan={4}>
              {" "}
              {data
                ? data.purfusions && data.purfusions.jour2
                : purfusions && purfusions.jour2}
            </td>
            <td colSpan={4}>
              {" "}
              {data
                ? data.purfusions && data.purfusions.jour3
                : purfusions && purfusions.jour3}
            </td>
            <td colSpan={4}>
              {" "}
              {data
                ? data.purfusions && data.purfusions.jour4
                : purfusions && purfusions.jour4}
            </td>
          </tr>

          <tr>
            <td>
              <strong>Nom:</strong> {data ? data.nom : nom}
            </td>
            <td colSpan={4}>
              <strong>Age:</strong>
              {data ? data.age : age}
            </td>
            <td colSpan={6}>
              <strong>Diagnostic:</strong>
              {data ? data.diagnostic : diagnostic}
            </td>
            <td colSpan={6}>
              <strong>Chirurgien:</strong>
              {data ? data.chirurgien : chirurgien}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Prénom:</strong>
              {data ? data.prenom : prenom}
            </td>
            <td colSpan={10}>
              <strong>Intervention:</strong>
              {data ? data.intervention : intervention}
            </td>
            <td colSpan={6}>
              <strong>Réanimateur:</strong>
              {data ? data.reanimateur : reanimateur}
            </td>
          </tr>
          <tr>
            <td colSpan={17}>
              <strong>Heure de sortie du bloc :</strong>
              {data ? data.heure : heure}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Surveillance;
