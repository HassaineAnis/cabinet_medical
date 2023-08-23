import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const VitesseS = ({ reference, nom, prenom, age, sexe }) => {
  const {
    date,

    crp,
    aslo,
    latex,
    wrose,

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
            <span>{date && new Date(date).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <table className="table1">
          <thead>
            <tr>
              <th rowSpan={2}>Resultats</th>
              <th colSpan={3}>Valeurs Usuelles</th>
            </tr>
            <tr>
              <th>
                <strong>Sexe</strong>
              </th>
              <th>Femme</th>
              <th>Homme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>1H:</strong>{" "}
              </td>
              <td>1 Heure</td>
              <td>7mm</td>
              <td>5mm</td>
            </tr>
            <tr>
              <td>
                <strong>1H:</strong>{" "}
              </td>
              <td>2 Heure</td>
              <td>17mm</td>
              <td>15mm</td>
            </tr>
          </tbody>
        </table>
        <div className="hiv">
          <p>
            <span>
              <strong>CRP :</strong>
            </span>
            <strong>............</strong>
            <span>{crp}.</span>
          </p>
          <p>
            <span>
              <strong>ASLO :</strong>
            </span>
            <strong>..........</strong>
            <span>{aslo}.</span>
          </p>
          <p>
            <span>
              {" "}
              <strong>LATEX :</strong>
            </span>
            <strong>.........</strong>
            <span>{latex}</span>
          </p>
          <p>
            <span>
              {" "}
              <strong>W ROSE :</strong>
            </span>
            <strong>......</strong>
            <span>{wrose}</span>
          </p>
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

export default VitesseS;
