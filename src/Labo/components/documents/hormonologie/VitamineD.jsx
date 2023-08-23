import { useContext } from "react";
import React from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const VitamineD = ({ reference, nom, prenom, sexe, age }) => {
  const {
    date,
    calcuim,
    vitamineD,

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
                <strong>: </strong> {nom}
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
            <span>{date && new Date(date).toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      <div className="partie2">
        <div style={{ display: "flex", alignSelf: "center", gap: "0.2rem" }}>
          <p className="point">
            <strong>25-(OH) Vitamine D:</strong>
          </p>

          <p>
            <strong>......</strong>
            {`${vitamineD} `}
            <strong>ng/l.</strong>
          </p>
        </div>
        <table className="table2">
          <thead>
            <tr>
              <th>Statut</th>
              <th>25-(OH) Vitamine D</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Déficient</strong>{" "}
              </td>

              <td>{"< 20 ng/ml"}</td>
            </tr>
            <tr>
              <td>
                <strong>Insuffisant</strong>{" "}
              </td>

              <td>{"20 - 29 ng/ml"}</td>
            </tr>
            <tr>
              <td>
                <strong>Suffisant</strong>{" "}
              </td>

              <td> {"30 - 100 ng/MI"}</td>
            </tr>
            <tr>
              <td>
                <strong>Toxicité pontentielle</strong>{" "}
              </td>

              <td> {"> 100 ng/MI"}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />

        <table className="table2">
          <thead>
            <tr>
              <th>Examens</th>
              <th>Resultats</th>
              <th>Valeurs Normales</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Calcium</strong>{" "}
              </td>
              <td>{calcuim}</td>
              <td>85.0 - 105 mg/l</td>
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

export default VitamineD;
