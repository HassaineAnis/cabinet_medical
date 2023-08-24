import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const Tp = ({ reference, nom, prenom, sexe, age, data, dateService }) => {
  const {
    date,

    service,

    inr,

    taux,

    tempProth,

    tck,
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
              {" "}
              {dateService
                ? new Date(dateService.date).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      <div className="partie2">
        <table>
          <thead>
            <tr>
              <th>TP</th>
              <th>
                <span>Temps de </span>
                <br /> <span> prothrombine</span>(s)
              </th>
              <th>
                {" "}
                <span>Taux de</span>
                <br /> <span>pourcentage(%)</span>
              </th>
              <th>I.N.R</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Témoin</strong>{" "}
              </td>
              <td>12.5</td>
              <td>100%</td>
              <td>1.0</td>
            </tr>
            <tr>
              <td>
                {" "}
                <strong>Patient</strong>
              </td>
              <td>{data ? data.tempProth : tempProth}</td>
              <td>{data ? data.taux : taux}</td>
              <td>{data ? data.inr : inr}</td>
            </tr>
          </tbody>
        </table>

        <div className="inr">
          <div className="intervalle">
            <p>Intervalle normal</p>
            <span>
              <strong>: </strong>activité :70-100%
            </span>
            <span style={{ marginLeft: "1rem" }}>INR :0.9-1.15</span>
          </div>
          <div className="intervalle">
            <p>Intervalle thérapeurique</p>
            <span>
              <strong>: </strong>activité :17-35%
            </span>
            <span style={{ marginLeft: "1rem" }}>INR :1.5-4.5</span>
          </div>
        </div>
        <div className="tck">
          <p>
            <strong>TCK :</strong> <span> {data ? data.tck : tck}</span> s
          </p>
          <p>Valeurs usuelles : 22 - 38 s</p>
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

export default Tp;
