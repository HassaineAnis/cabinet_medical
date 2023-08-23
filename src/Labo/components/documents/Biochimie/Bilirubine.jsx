import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const Bilirubine = ({ reference, nom, prenom, age, sexe }) => {
  const {
    date,
    bilirubineSangT,
    bilirubineSangD,
    bilirubineUrineT,
    bilirubineUrineD,
    calcuim,
    crp,
    coombs,
    rai,

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
            <span>{date && new Date(date).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <p className="point" style={{ alignSelf: "center" }}>
          <span style={{ textDecoration: "underline" }}>
            <strong>HGPO :</strong>
          </span>
          (Hyperglycémie provoquéé par voie orale)
        </p>
        <table className="table1">
          <thead>
            <tr>
              <th rowSpan={2}>Examens</th>
              <th colSpan={2}>Sang</th>
              <th colSpan={2}>Urine</th>
            </tr>
            <tr>
              <th>Résultat</th>
              <th>Valeur</th>
              <th>Résultat</th>
              <th>Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Bilirubine T</strong>
              </td>
              <td>{bilirubineSangT}</td>
              <td>
                <strong>{"< à 10 mg/l"}</strong>
              </td>
              <td>{bilirubineUrineT}</td>
              <td>.....</td>
            </tr>
            <tr>
              <td>
                <strong>Bilirubine D</strong>
              </td>
              <td> {bilirubineSangD}</td>
              <td>
                <strong>{"< à 2.5 mg/l"}</strong>
              </td>
              <td>{bilirubineUrineD}</td>
              <td>........</td>
            </tr>
            {/* Ajoutez plus de lignes selon vos besoins */}
          </tbody>
        </table>

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
                <strong>Calcuim</strong>
              </td>
              <td>
                <strong>{calcuim}</strong>
              </td>
              <td>
                <strong>85.0 - 105 mg/l</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="hiv">
          <p>
            <span>
              <strong>CRP( Protéine C-Réactive) :</strong>
            </span>{" "}
            <span>{`${crp}`}.</span>
          </p>
          <p>
            <span>
              <strong>Test De Coombs :</strong>
            </span>{" "}
            <span>{`${coombs}`}.</span>
          </p>
          <p>
            <span>
              {" "}
              <strong>RAI (Recherche d'agglutinines irrégulières) :</strong>
            </span>
            <span>{`${rai}`}</span>
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
export default Bilirubine;
