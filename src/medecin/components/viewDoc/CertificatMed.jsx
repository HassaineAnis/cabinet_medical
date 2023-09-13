import React from "react";
import logo from "../../../assets/logo (1).png";
const CertificatMed = ({ consultation, cible, document }) => {
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
              Certificat de pneumo phtisiologie
            </strong>
          </h2>
          <div style={{ display: "flex", gap: "2rem" }}>
            <p>
              <strong>Nom:</strong>
              {` ${consultation.patient && consultation.patient.nom}`}
            </p>
            <p>
              <strong>Prénom</strong>
              {` ${consultation.patient && consultation.patient.prenom}`}
            </p>
            <p>
              <strong>Age :</strong>
              {` ${consultation.patient && consultation.patient.age} `}
              <strong>ans</strong>
            </p>
          </div>
          <p>
            <strong>Je soussigné,</strong>
          </p>

          <p style={{ textAlign: "center" }}>
            Déclare que le susnommé{" "}
            {document.donnes &&
              document.donnes.diagnostic === "rien" &&
              " aucune maladie cliniquement décelable "}
            {document.donnes &&
              document.donnes.diagnostic === "malade" &&
              `présente ${document.donnes && document.donnes.maladie} `}
            ce jour.
          </p>
          <br />
          <br />
          <br />
          <p style={{ textAlign: "center" }}>
            Certificat établi pour servir et faire valoir ce qui est de droit.
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

export default CertificatMed;
