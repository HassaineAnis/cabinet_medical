import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import React from "react";

const Gs = ({ reference }) => {
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
                <strong>: </strong>hassaine
              </span>
            </p>
            <p>
              <span>
                <strong>Prénom</strong>
              </span>{" "}
              <span>
                <strong>: </strong>hassaine
              </span>
            </p>
            <p>
              <span>
                <strong>Adresse</strong>
              </span>{" "}
              <span>
                <strong>: </strong>hassaine
              </span>
            </p>
          </div>
          <p>
            <strong>DBK LE :</strong> <span>13/13/1009</span>
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
              <strong>O</strong>
            </p>
          </div>
          <div className="rs">
            <p>
              <strong>Facteur Rhésus:</strong>
            </p>
            <p>
              <strong>Rh+</strong>
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
