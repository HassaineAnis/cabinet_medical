import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const ProlE2 = ({ reference, nom, prenom, age, sexe }) => {
  const { date, service, prolactine, oestradiol } = useContext(BpoContext);

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
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Dosage De La Prolactine</strong>
            </p>
            <p style={{ margin: "0" }}>
              <strong>..........</strong>
              <strong>{`${prolactine} `} ng/ml.</strong>
            </p>
          </div>
          <p style={{ margin: "0", width: "fitContent", textAlign: "center" }}>
            Valeur Usuelles : 4.79 - 23.63
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Dosage De L'oestradiole</strong>
            </p>
            <p style={{ margin: "0" }}>
              <strong>..........</strong>
              <strong>{`${oestradiol} `} pg/ml.</strong>
            </p>
          </div>
        </div>
        <span style={{ textDecoration: "underline" }}>Valeur usuelles:</span>
        <table className="table1">
          <thead></thead>
          <tbody>
            <tr>
              <td rowSpan={4}>Femme</td>
              <td>Phase Folliculaire</td>

              <td>12.5 - 166</td>
            </tr>
            <tr>
              <td>Phase Ovulatoire</td>
              <td>85.5 - 498</td>
            </tr>
            <tr>
              <td>Phase Luteale</td>
              <td>43.8 - 211</td>
            </tr>
            <tr>
              <td>Post Menopause</td>
              <td>5 - 54.7</td>
            </tr>
            <tr>
              <td>Homme</td>
              <td>/</td>
              <td>7.6 - 43</td>
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

export default ProlE2;
