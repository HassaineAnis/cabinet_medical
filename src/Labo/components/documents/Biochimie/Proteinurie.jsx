import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const Proteinurie = ({ reference, nom, prenom, age, sexe, data, dateDoc }) => {
  const {
    date,
    proteinurie,
    diurese,

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
                <strong>: </strong> {prenom}
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
                <strong>: </strong> {age}
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
        <div style={{ alignSelf: "center" }}>
          <div style={{ display: "flex", alignSelf: "center", gap: "0.2rem" }}>
            <p>
              <strong>Proteinurie de 24h:</strong>
            </p>
            <p>
              <strong>.......</strong>
              {`${data ? data.proteinurie : proteinurie} `}
              <strong>mg/24h.</strong>
            </p>
          </div>

          <div style={{ display: "flex", alignSelf: "center", gap: "1rem" }}>
            <p>
              <strong>Diurese:</strong>
            </p>
            <p>
              <strong>.......</strong>
              {`  ${data ? data.diurese : diurese} `}
              <strong>L.</strong>
            </p>
          </div>

          <div style={{ display: "flex", alignSelf: "center", gap: "1rem" }}>
            <p>
              <strong>Valeurs Usuelles:</strong>
            </p>
            <p>
              <strong>{"<150 "}mg/24h.</strong>
            </p>
          </div>
        </div>

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

export default Proteinurie;
