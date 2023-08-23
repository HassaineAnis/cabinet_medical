import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";

const Toxo = ({ reference, nom, prenom, age, sexe }) => {
  const { date, toxoplasmose, service } = useContext(BpoContext);
  const verifieToxoplasmose = (valeur) => {
    const intvaleur = parseFloat(valeur);
    if (intvaleur < 4) {
      return "Négatif";
    }
    if (intvaleur >= 4 && intvaleur <= 8) {
      return "Douteux";
    }
    if (intvaleur >= 8) {
      return "Positif";
    }
  };
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
        <p className="point" style={{ textDecoration: "underline" }}>
          <strong>Serodiagnostique de la Toxoplasmose:</strong>
        </p>
        <ul style={{ margin: "0" }}>
          <li className="no_decor_list">
            <strong>Serologie:</strong>
          </li>
          <ul>
            <li className="no_decor_list">
              Toxoplasmose, sérologie<strong> lgG</strong>{" "}
              <strong>.....</strong> <strong>{`${toxoplasmose}`}</strong> UI/ml.
            </li>
            <li className="no_decor_list">
              Toxoplasmose, sérologie <strong>lgG</strong>{" "}
              <strong>.....</strong>{" "}
              <strong>{verifieToxoplasmose(toxoplasmose)}.</strong>
            </li>
          </ul>
        </ul>
        <table className="table2">
          <thead>
            <tr>
              <th>
                <strong>{"<4 UI/ml"}</strong>
              </th>
              <th>Négatif</th>

              <th>
                Patiente non immunisée, nécessite un controle sérologique le
                statut immunitaire
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{"4 <= Titre <= 8 UI/ml"}</strong>
              </td>
              <td>Douteux</td>
              <td>
                Zone équivoque a controler dans &5 jours pour interpréter le
                statut immunitaire
              </td>
            </tr>
            <tr>
              <td>
                <strong>{"<= 8 UI/ml"}</strong>
              </td>
              <td>Positif</td>
              <td>
                1er détermination à controler dans 15 jours <br />
                2eme détermination si taux stade d'IgG/absence d'IgM-immunité
                ancienne <br />
                si{">"} double titre-Dosage IgM recommandé
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

export default Toxo;
