import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const Caluim = ({ reference, nom, prenom, age, sexe, data, dateDoc }) => {
  const {
    date,
    calcuim,
    phosphore,
    magnesium,
    ferSerrique,

    service,
  } = useContext(BpoContext);
  return (
    <div className="tp" ref={reference}>
      <div className="partie1_container">
        <div className="entete">
          <h3>
            CLINIQUE MEDICO-CHIRURGICALE LA COLOMBE SERVICE / LABORATOIRE
            D'ANALYSES MEDICALES
          </h3>
          <img src={logo} alt="logo" />
        </div>

        <div className="partie1">
          <div className="infoPatient">
            <p>
              <span>
                <strong>Nom </strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {nom}
              </span>
            </p>
            <p>
              <span>
                <strong>Prénom</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {prenom}
              </span>
            </p>
            <p>
              <span>
                <strong>Sérvice</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {service}
              </span>
            </p>
            <p>
              <span>
                {" "}
                <strong>Age</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {age}
              </span>
            </p>{" "}
            <p>
              <span>
                <strong>Sexe</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {sexe}
              </span>
            </p>
          </div>
          <p>
            <strong>DBK LE :</strong>{" "}
            <span>
              {" "}
              {dateDoc
                ? new Date(dateDoc).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <table className="table1">
          <thead>
            <tr>
              <th>Examens</th>
              <th>Resultat</th>
              <th>Valeurs Normales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Calcuim</strong>
              </td>
              <td>{`${data ? data.calcuim : calcuim}`}</td>
              <td>
                <strong>{"< 85.0-105 mg/l"}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phosphore</strong>
              </td>
              <td>
                {" "}
                <strong>{`${data ? data.phosphore : phosphore}`}</strong>
              </td>
              <td>
                <strong>{"< 2.5-4.5 mg/dl"}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Magnesium</strong>
              </td>
              <td>
                {" "}
                <strong>{`${data ? data.magnesium : magnesium}`}</strong>
              </td>
              <td>
                <strong>{"< 1.7-2.4 mg/dl"}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table2" style={{ marginTop: "3rem" }}>
          <thead>
            <tr>
              <th>
                <strong>Examens</strong>
              </th>
              <th>
                <strong>Resultats</strong>
              </th>

              <th>
                <strong>Valeurs Normales</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Fer Serrique</strong>
              </td>
              <td>
                <strong>{`${data ? data.ferSerrique : ferSerrique}`}</strong>
              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <p style={{ margin: "0" }}>
                    <strong>Hommes: 65-175 ug/dl</strong>
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Femmes: 50-170 ug/dl</strong>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bas-page">
          <hr className="no_print" />
          <p>
            Lotissement Touares//{"(Derriére ONALAIT DBK)"} Tel /Fax :026 27 32
            20/ Tél:0550969565
          </p>
        </div>
      </div>
    </div>
  );
};
export default Caluim;
