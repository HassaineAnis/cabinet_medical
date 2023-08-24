import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";
function Hiv({ reference, nom, prenom, sexe, age, data, dateService }) {
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
                {dateService ? dateService.service : service}
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
              {dateService
                ? new Date(dateService.date).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <div className="liste">
          <dis className="liste_container">
            <p style={{ marginBottom: "1rem" }}>
              <strong>
                <span style={{ textDecoration: "underline" }}>HGPO</span>
              </strong>
              :(Hyperglycémie provoqué pas voie orale)
            </p>
            <p className="point">
              <strong>HIV :</strong>
              {` ${data ? data.hiv : hiv}`}
            </p>
            <p className="point">
              <strong>HBS :</strong>
              {` ${data ? data.hbs : hbs}`}
            </p>
            <p className="point">
              <strong>HCV :</strong>
              {` ${data ? data.hcv : hcv}`}
            </p>
            <p className="point">
              <strong>BW :</strong>
              {` ${data ? data.bw : bw}`}
            </p>
          </dis>
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
}

export default Hiv;
