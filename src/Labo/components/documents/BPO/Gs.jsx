import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import React, { useContext } from "react";
import { BpoContext } from "../../../../util/context/Context";

const Gs = ({ reference, nom, prenom, adresse, data, dateService }) => {
  const { date, gs, rhesus } = useContext(BpoContext);
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
        <h3 style={{ textAlign: "center" }}>CARTE DE GROUPE SANGUIN</h3>
        <div className="partie1">
          {" "}
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
                <strong>Adresse</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {adresse}
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
        <div className="gsr">
          <div className="gs">
            <p>
              <strong>Groupe Sanguin:</strong>
            </p>
            <p>
              <strong>{data ? data.gs : gs}</strong>
            </p>
          </div>
          <div className="rs">
            <p>
              <strong>Facteur Rhésus:</strong>
            </p>
            <p>
              <strong>{data ? data.rhesus : rhesus}</strong>
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

export default Gs;
