import React from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
function Hiv({ reference }) {
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
                <strong>Sérvice</strong>
              </span>{" "}
              <span>
                <strong>: </strong>hassaine
              </span>
            </p>
            <p>
              <span>
                {" "}
                <strong>Age</strong>
              </span>{" "}
              <span>
                <strong>: </strong>hassaine
              </span>
            </p>{" "}
            <p>
              <span>
                <strong>Sexe</strong>
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
        <div className="liste">
          <dis className="liste_container">
            <p style={{ marginBottom: "1rem" }}>
              <strong>
                <span style={{ textDecoration: "underline" }}>HGPO</span>
              </strong>
              :(Hyperglycémie provoqué pas voie orale)
            </p>
            <p className="point">
              <strong>HIV</strong>
              ...........
            </p>
            <p className="point">
              <strong>HBS</strong>.........
            </p>
            <p className="point">
              <strong>HCV</strong>.......
            </p>
            <p className="point">
              <strong>BW</strong>........
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
