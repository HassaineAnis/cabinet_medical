import React, { useContext } from "react";
import { SurveilleBabyContext } from "../../../util/context/Context";
import { listeBaby } from "../../../data/surveillant/ListeBaby";

const Baby = ({ reference, data }) => {
  const {
    nne,

    date,

    heure,

    sexe,

    accouchement,

    couveuse,

    nom,

    prenom,

    groupage,

    documentData,

    antiD,
  } = useContext(SurveilleBabyContext);
  const afficherData = (titre) => {
    return documentData.find((item) => item.titre === titre);
  };
  const afficherDesignation = (titre, documentData) => {
    return documentData.find((item) => item.titre === titre);
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
        <tbody>
          <tr>
            <td>
              <strong>NNE:</strong>
              {data ? data.nne : nne}
            </td>
            <td>
              <strong>Date:</strong>
              {data
                ? new Date(data.date).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </td>
            <td>
              <strong>Heue:</strong>
              {data ? data.heure : heure}
            </td>
            <td>
              <strong>Sexe:</strong>
              {data ? data.sexe : sexe}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Nom,Prenom de la maman:</strong>
              {data ? `${data.nom} ${data.prenom}` : `${nom} ${prenom}`}
            </td>
            <td>
              <strong>Nature de l'accouchement:</strong>
              {data ? data.accouchement : accouchement}
            </td>
            <td>
              <strong>Groupe:</strong>
              {data ? data.groupage : groupage}
              <br />
              <strong>Anti-D:</strong>
              {data ? data.antiD : antiD}
            </td>
            <td>
              <strong>Couveuse:</strong>
              {data ? data.couveuse : couveuse} <br />
              <strong>De heure a:</strong>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <strong>a la naissance 1er jour</strong>
            </td>
            <td>
              {" "}
              <strong>2eme jour</strong>{" "}
            </td>
            <td>
              <strong>Sortie</strong>
            </td>
          </tr>
          {listeBaby.map((element, index) => (
            <tr key={index}>
              <td>
                <strong>{element}</strong>
              </td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(element, data.documentData) &&
                    afficherDesignation(element, data.documentData).jour1
                  : afficherData(element) && afficherData(element).jour1}
              </td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(element, data.documentData) &&
                    afficherDesignation(element, data.documentData).jour2
                  : afficherData(element) && afficherData(element).jour2}
              </td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(element, data.documentData) &&
                    afficherDesignation(element, data.documentData).jour3
                  : afficherData(element) && afficherData(element).jour3}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Baby;
