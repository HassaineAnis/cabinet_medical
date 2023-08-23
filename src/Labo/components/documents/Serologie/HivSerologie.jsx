import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";
const HivSerologie = ({ reference, nom, prenom, age, sexe }) => {
  const {
    date,

    service,
    hiv,
    hbs,
    hcv,
    bw,
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
                <strong>Sérvice </strong>
              </span>

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
            <span>{date && new Date(date).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.1rem" }}>
            <p style={{ margin: "0" }} className="point">
              <strong>HIV</strong>
            </p>
            <strong>........</strong>
            <p style={{ margin: "0" }}>{`${hiv}`}</p>
          </div>
          <div style={{ display: "flex", gap: "0.1rem" }}>
            <p style={{ margin: "0" }} className="point">
              <strong>HBS</strong>
            </p>
            <strong>......</strong>
            <p style={{ margin: "0" }}>{`${hbs}`}</p>
          </div>
          <div style={{ display: "flex", gap: "0.1rem" }}>
            <p style={{ margin: "0" }} className="point">
              <strong>HCV</strong>
            </p>
            <strong>......</strong>
            <p style={{ margin: "0" }}>{`${hcv}`}</p>
          </div>
          <div style={{ display: "flex", gap: "0.1rem" }}>
            <p style={{ margin: "0" }} className="point">
              <strong>BW</strong>
            </p>
            <strong>........</strong>
            <p style={{ margin: "0" }}>{`${bw}`}</p>
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

export default HivSerologie;
