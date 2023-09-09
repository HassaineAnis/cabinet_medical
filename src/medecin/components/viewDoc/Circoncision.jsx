import React from "react";
import logo from "../../../assets/logo (1).png";

function Circoncision({ consultation, cible, document }) {
  return (
    <div className="tp" ref={cible}>
      <div className="partie1_container">
        <div className="entete" style={{ justifyContent: "center" }}>
          <h3>
            Etablissement Hospitalier Privé La Colombe <br />
            <span style={{ fontWeight: "400", fontSize: "1rem" }}>
              Lot TOUARES II D B K 15100 TIZI-OUZOU <br /> Tel / Fax : 026 43 32
              22 / 33 22 Mob: 0550 96 95 65
            </span>
          </h3>

          <img src={logo} alt="Logo Administration" />
        </div>

        <div className="partie1" style={{ justifyContent: "flex-end" }}>
          <p>
            <strong>DBK LE :</strong>
            <span>{` ${
              document.donnes &&
              new Date(document.donnes.date).toLocaleDateString()
            }`}</span>
          </p>
        </div>
        <div className="partie2">
          <h2 style={{ textAlign: "center" }}>
            <strong
              style={{ textDecoration: "underline", textAlign: "center" }}
            >
              Certificat de circoncision
            </strong>
          </h2>

          <p>
            <strong>Je soussigné(e), certifie avoir pratiqué ce jour</strong>
          </p>
          <p>
            <strong>
              Une circoncision à l'enfant :
              {`${consultation.patient && consultation.patient.nom} ${
                consultation.patient && consultation.patient.prenom
              }`}
            </strong>
          </p>
          <p>
            <strong>
              Agé de :
              {`${consultation.patient && consultation.patient.age} ans`}{" "}
            </strong>
          </p>
          <p>
            <strong>
              Fils de :{`${document.donnes && document.donnes.parent}`}
            </strong>
          </p>
          <p style={{ textAlign: "center" }}>
            Certificat établi pour servir et faire valoir ce qui est de droit.
          </p>
          <p style={{ textAlign: "right", textTransform: "capitalize" }}>
            <strong style={{ textDecoration: "underline" }}>
              Le chirurgien
            </strong>
            <br />
            {`${consultation.medecin && consultation.medecin.nom} ${
              consultation.medecin && consultation.medecin.prenom
            }`}
          </p>
          <div className="bas-page">
            <hr className="no_print" />
            <p>
              Etablissement Hospitalier Privé la Colombe Touares II Draa Ben
              Khedda <br />
              15100 Tizi-Ouzou
              <br />
              Mobile: 0550 96 95 65 - Tél/Fax: 026 43 32 22 / 026 43 33 22{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Circoncision;
