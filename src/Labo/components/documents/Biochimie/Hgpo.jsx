import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";
const Hgpo = ({ reference, nom, prenom, age, sexe, data, dateDoc }) => {
  const {
    date,
    dosage1,
    dosage2,
    dosage3,

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
                <strong>: </strong> {sexe}
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
        <p style={{ alignSelf: "center" }}>
          <strong>HGPO :</strong>(Hyperglycémie provoquéé par voie orale)
        </p>
        <table className="table2">
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
                <strong>Dosage 1 (à jeun)</strong>
              </td>
              <td>
                <strong>{data ? data.dosage1 : dosage1}</strong>
              </td>
              <td>
                <strong>
                  <strong>{"<0.92 g/l"}</strong>{" "}
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Dosage 2 (à 1 h)</strong>
              </td>
              <td>
                <strong>{data ? data.dosage2 : dosage2}</strong>
              </td>
              <td>
                <strong>{"<1.80 g/l"}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Dosage 3 (à 2 h)</strong>
              </td>
              <td>
                <strong>{data ? data.dosage3 : dosage3}</strong>
              </td>
              <td>
                <strong>{"<1.53 g/l"}</strong>
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

export default Hgpo;
