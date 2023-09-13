import React from "react";
import logo from "../../../assets/logo (1).png";
const pelvienne = ({ consultation, cible, document }) => {
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
              COMPTE RENDU D'ECHOGRAPHIE OBSTETRICALE
            </strong>
          </h2>
        </div>
        <div className="partie2">
          <p style={{ textAlign: "right" }}>
            <strong>DBK LE :</strong>{" "}
            <span>{`${
              document.donnes &&
              new Date(document.donnes.date).toLocaleDateString()
            }`}</span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Nom & Prénom:</strong>
              {` ${consultation.patient && consultation.patient.nom} ${
                consultation.patient && consultation.patient.prenom
              }`}
            </p>
            <p style={{ margin: "0" }}>
              {" "}
              <strong>Age:</strong>
              {` ${consultation.patient && consultation.patient.age}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Gs:</strong>
              {` ${document.donnes && document.donnes.gs}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Nom de l'époux:</strong>
              {` ${document.donnes && document.donnes.nomEpou}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Gs</strong>
              {` ${document.donnes && document.donnes.gsEpou}`}
            </p>
          </div>
          <p style={{ margin: "0" }}>
            <strong>Indication :</strong>
            {` ${document.donnes && document.donnes.Indication}`}
          </p>
          <p style={{ margin: "0" }}>
            <strong>Echographie :</strong>
            {` ${document.donnes && document.donnes.echographie}`}
          </p>
          <p style={{ margin: "0" }}>
            <strong>Vessie :</strong>
            {` ${document.donnes && document.donnes.vessie}`}
          </p>
          <p style={{ margin: "0" }}>
            <strong>Utuérus :</strong>
            {` ${document.donnes && document.donnes.uterus}`}
          </p>
          <div style={{ position: "relative", left: "3rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Position:</strong>
              {` ${document.donnes && document.donnes.position}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Dimension:</strong>
              {` ${document.donnes && document.donnes.dimension}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Endométre: </strong>
              {` ${document.donnes && document.donnes.endometre}`}
            </p>
          </div>

          <p style={{ margin: "0" }}>
            <strong>Myomètre: </strong>
            {` ${document.donnes && document.donnes.endometre}`}
          </p>
          <p style={{ margin: "0" }}>
            <strong>Ovaires: </strong>
          </p>
          <div style={{ position: "relative", left: "3rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Gauche: </strong>
              {` ${document.donnes && document.donnes.gauche}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Droite: </strong>
              {` ${document.donnes && document.donnes.droit}`}
            </p>
          </div>

          <p style={{ margin: "0" }}>
            <strong>Culs de sac :</strong>
            {`${document.donnes && document.donnes.sac}`}
          </p>
          <div>
            <p style={{ margin: "0" }}>
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

export default pelvienne;
