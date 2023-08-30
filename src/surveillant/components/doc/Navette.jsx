import React, { useContext } from "react";
import "../../../style/surveillantStyle/doc/navette.css";
import { NavetteContext } from "../../../util/context/Context";
import { listeMedicaments } from "../../../data/surveillant/ListeMedicaments";

const Navette = ({ reference, data }) => {
  const { nom, prenom, age, dateSortie, dateEntre, diagnostic, designation } =
    useContext(NavetteContext);
  const afficherData = (medicament) => {
    return designation.find((item) => item.medicament === medicament);
  };
  const afficherDesignation = (medicament, documentData) => {
    return documentData.find((item) => item.medicament === medicament);
  };

  return (
    <div className="navette" ref={reference}>
      <h3>Fiche Navette</h3>
      <div className="infoPatient">
        <ul className="liste1">
          <li>
            <p>
              <strong>Nom:</strong>
            </p>
            {data ? data.nom : nom}
          </li>
          <li>
            <p>
              <strong>Prénom:</strong>
            </p>
            {data ? data.prenom : prenom}
          </li>
          <li>
            <p>
              <strong>Age:</strong>
            </p>
            {data ? data.age : age}
          </li>
        </ul>{" "}
        <ul className="liste2">
          <li>
            <p>
              <strong>Disgnostic:</strong>
            </p>
            {data ? data.diagnostic : diagnostic}
          </li>
          <li>
            <p>
              <strong>Date d'entrée:</strong>
            </p>
            {data
              ? new Date(data.dateEntre).toLocaleDateString()
              : dateEntre && new Date(dateEntre).toLocaleDateString()}
          </li>
          <li>
            <p>
              <strong>date de sortie:</strong>
            </p>
            {data
              ? new Date(data.dateSortie).toLocaleDateString()
              : dateSortie && new Date(dateSortie).toLocaleDateString()}
          </li>
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>désignation</th>
            <th>matérnité</th>
            <th>bloc</th>
            <th>hospitalisation</th>
          </tr>
        </thead>
        <tbody>
          {listeMedicaments.map((med, index) => (
            <tr key={index}>
              <td>{med}</td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(med, data.documentData) &&
                    afficherDesignation(med, data.documentData).maternite
                  : afficherData(med) && afficherData(med).maternite}
              </td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(med, data.documentData) &&
                    afficherDesignation(med, data.documentData).bloc
                  : afficherData(med) && afficherData(med).bloc}
              </td>
              <td>
                {data && data.documentData
                  ? afficherDesignation(med, data.documentData) &&
                    afficherDesignation(med, data.documentData).hospital
                  : afficherData(med) && afficherData(med).hospital}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Navette;
