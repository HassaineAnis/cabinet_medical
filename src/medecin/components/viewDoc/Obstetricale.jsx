import React from "react";
import logo from "../../../assets/logo (1).png";
const Obstetricale = ({ consultation, cible, document }) => {
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
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>G:</strong>
              {` ${document.donnes && document.donnes.g}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>P:</strong>
              {` ${document.donnes && document.donnes.p}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>A:</strong>
              {` ${document.donnes && document.donnes.a}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>C:</strong>
              {` ${document.donnes && document.donnes.c}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Poid:</strong>
              {` ${document.donnes && document.donnes.poid}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Tension Artériel:</strong>
              {` ${document.donnes && document.donnes.tension}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>DDR:</strong>
              {` ${
                document.donnes &&
                new Date(document.donnes.ddr).toLocaleDateString()
              }`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Terme Actuel:</strong>
              {` ${document.donnes && document.donnes.termeA}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>TPA:</strong>
              {` ${document.donnes && document.donnes.tpa}`}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Nombre de fœtus :</strong>
              {` ${document.donnes && document.donnes.nombre}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Présentation:</strong>
              {` ${document.donnes && document.donnes.presentation}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Vitalité:</strong>
              {` ${document.donnes && document.donnes.vitalite}`}
            </p>
          </div>
          <p
            className="point"
            style={{
              position: "relative",
              left: "3rem",
              marginBottom: "0",
            }}
          >
            <span style={{ textDecoration: "underline" }}>BIOMETRIE</span>
          </p>
          <div style={{ display: "flex", gap: "3rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p style={{ margin: "0" }}>
                <strong>LCC:</strong>
                {` ${document.donnes && document.donnes.lcc} mm`}
              </p>
              <p style={{ margin: "0" }}>
                <strong>CN:</strong>
                {` ${document.donnes && document.donnes.cn} mm`}
              </p>
              <p style={{ margin: "0" }}>
                <strong>LF:</strong>
                {` ${document.donnes && document.donnes.lf} mm`}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p style={{ margin: "0" }}>
                <strong>BIP:</strong>
                {` ${document.donnes && document.donnes.bip} mm`}
              </p>
              <p style={{ margin: "0" }}>
                <strong>CT:</strong>
                {` ${document.donnes && document.donnes.ct} mm`}
              </p>
              <p style={{ margin: "0" }}>
                <strong>PA:</strong>
                {` ${document.donnes && document.donnes.pa} mm`}
              </p>
            </div>
          </div>
          <p
            className="point"
            style={{
              position: "relative",
              left: "3rem",
              marginBottom: "0",
            }}
          >
            <span style={{ textDecoration: "underline" }}>MORPHOLOGIE</span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Position du coeur:</strong>
              {` ${document.donnes && document.donnes.coeur}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Cavités :</strong>
              {` ${document.donnes && document.donnes.cavite}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Vaisseaux :</strong>
              {` ${document.donnes && document.donnes.vaisseau}`}
            </p>
          </div>
          <p style={{ margin: "0" }}>
            <strong>Rachis :</strong>
            {` ${document.donnes && document.donnes.rachis}`}
          </p>
          <p style={{ margin: "0" }}>
            <strong>Reins :</strong>
            {` ${document.donnes && document.donnes.reins}`}
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p style={{ margin: "0" }}>
              <strong>Vessie:</strong>
              {` ${document.donnes && document.donnes.vessie}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Estomac :</strong>
              {` ${document.donnes && document.donnes.estomac}`}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Membres :</strong>
              {` ${document.donnes && document.donnes.membre}`}
            </p>
          </div>
          <p
            className="point"
            style={{
              position: "relative",
              left: "3rem",
              marginBottom: "0",
            }}
          >
            <span style={{ textDecoration: "underline" }}>ANNEXES</span>
          </p>
          <p style={{ margin: "0" }}>
            <strong>Placenta :</strong>
            {` ${document.donnes && document.donnes.placenta}`}
          </p>{" "}
          <p style={{ margin: "0" }}>
            <strong>Liquide amniotique :</strong>
            {` ${document.donnes && document.donnes.liquide}`}
          </p>{" "}
          <p style={{ margin: "0" }}>
            <strong>Cardon :</strong>
            {` ${document.donnes && document.donnes.cardon}`}
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

export default Obstetricale;
