import React from "react";
import logo from "../../../assets/logo (1).png";
const DebutGross = ({ consultation, cible, document }) => {
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

        <div className="partie1" style={{ justifyContent: "center" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.2rem" }}>
            <strong
              style={{
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              COMPTE RENDU D'ECHOGRAPHIE D'UNE GROSSESSE DEBUTANTE
            </strong>
          </h2>
        </div>
        <div className="partie2">
          <p style={{ textAlign: "right" }}>
            <strong>DBK LE :</strong>{" "}
            <span>{`${document.donnes && document.donnes.date}`}</span>
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Nom & Prénom:</strong>
              {` ${consultation.patient && consultation.patient.nom} ${
                consultation.patient && consultation.patient.prenom
              }`}
            </p>
            <p>
              <strong>Age:</strong>
              {` ${consultation.patient && consultation.patient.age}`}
            </p>
            <p>
              <strong>Gs:</strong>
              {` ${document.donnes && document.donnes.gs}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Nom de l'époux:</strong>
              {` ${document.donnes && document.donnes.nomEpou}`}
            </p>
            <p>
              <strong>Gs</strong>
              {` ${document.donnes && document.donnes.gsEpou}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>G:</strong>
              {` ${document.donnes && document.donnes.g}`}
            </p>
            <p>
              <strong>P:</strong>
              {` ${document.donnes && document.donnes.p}`}
            </p>
            <p>
              <strong>A:</strong>
              {` ${document.donnes && document.donnes.a}`}
            </p>
            <p>
              <strong>C:</strong>
              {` ${document.donnes && document.donnes.c}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Poid:</strong>
              {` ${document.donnes && document.donnes.poid}`}
            </p>
            <p>
              <strong>Tension Artériel:</strong>
              {` ${document.donnes && document.donnes.tension}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>DDR:</strong>
              {` ${
                document.donnes &&
                new Date(document.donnes.ddr).toLocaleDateString()
              }`}
            </p>
            <p>
              <strong>Terme Actuel:</strong>
              {` ${document.donnes && document.donnes.termeA}`}
            </p>
            <p>
              <strong>TPA:</strong>
              {` ${document.donnes && document.donnes.tpa}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>DDRC:</strong>
              {` ${document.donnes && document.donnes.ddrc}`}
            </p>
            <p>
              <strong>Terme Corrigé:</strong>
              {` ${document.donnes && document.donnes.termeC}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Date de début de grossesse:</strong>
              {` ${
                document.donnes &&
                new Date(document.donnes.dateDebut).toLocaleDateString()
              }`}
            </p>
            <p>
              <strong>Nombre de fœtus:</strong>
              {` ${document.donnes && document.donnes.nombre}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Activité cardiaque:</strong>
              {` ${document.donnes && document.donnes.cardiaque}`}
            </p>
            <p>
              <strong>LCC:</strong>
              {` ${document.donnes && document.donnes.lcc}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>
              <strong>Volume amniotique:</strong>
              {` ${document.donnes && document.donnes.volume}`}
            </p>
            <p>
              <strong>Aspect du placenta:</strong>
              {` ${document.donnes && document.donnes.aspect}`}
            </p>
          </div>
          <div>
            <p>
              <strong>Conclusion:</strong>
              {` ${document.donnes && document.donnes.conclusion}`}
            </p>
          </div>

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

export default DebutGross;
