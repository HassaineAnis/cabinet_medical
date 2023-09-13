import React from "react";
import logo from "../../../assets/logo (1).png";

const Grossesse = ({ consultation, cible, document }) => {
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

        <div className="partie1" style={{ justifyContent: "space-between" }}>
          <p style={{ textAlign: "left", fontSize: ".9rem" }}>
            <strong>Dr. CHALAH Md. Bellaïd</strong>
            <br />
            GYNECOLOGIE
            <br />
            10 1273 T.Z.O
          </p>
          <p>
            <strong>DBK LE :</strong>{" "}
            <span>{`${
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
              CERTIFICAT DE GROSSESSE
            </strong>
          </h2>

          <p>
            <strong>Je soussigné(e), certifie avoir examiner ce jour</strong>
          </p>
          <p>
            <strong>Madame :</strong>
            {` ${consultation.patient && consultation.patient.nom} ${
              consultation.patient && consultation.patient.prenom
            }`}
          </p>
          <p>
            <strong>Epouse de: </strong>
            {` ${document.donnes && document.donnes.epou}`}
          </p>
          <p>
            <strong>Agée de :</strong>
            {` ${consultation.patient && consultation.patient.age} `}
            <strong>ans</strong>
          </p>
          <p>
            <strong>Et déclare qu'elle présente une grossesse de :</strong>
            {` ${document.donnes && document.donnes.nombreMois} mois`}
          </p>
          <p>
            <strong>L'accouchement prévu le :</strong>
            {` ${
              document.donnes &&
              new Date(document.donnes.datePrevu).toLocaleDateString()
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
};

export default Grossesse;
