import React from "react";
import logo from "../../../assets/logo (1).png";

const Bilan = ({ consultation, cible, document }) => {
  return (
    <div className="ordonnance_Container" ref={cible}>
      <div className="section1">
        <div className="entete">
          <div className="entete_text">
            <h3>Etablissement Hospitalier Privé La Colombe</h3>
            <hr />
            <h4>
              Le progrès et l'humanisme au service de la santé
              <br />
              المؤسسة الإستشفائية الخاصة لاكولومب
              <br />
              التقدم و الإنسانية في خدمة الصحة
            </h4>
          </div>
          <img src={logo} alt="Logo Administration" />
        </div>
        <div className="section1_info">
          <div className="info">
            <p>
              <strong>Nom :</strong>{" "}
              <span>
                {" "}
                {` ${consultation.patient && consultation.patient.nom}`}
              </span>
            </p>
            <p>
              <strong>Prénom :</strong>{" "}
              <span>{` ${
                consultation.patient && consultation.patient.prenom
              }`}</span>
            </p>
            <p>
              <strong>Age :</strong>{" "}
              <span>
                {" "}
                {` ${consultation.patient && consultation.patient.age} `}ans
              </span>
            </p>
          </div>

          <div className="date">
            <p>
              <strong> DBK, le :</strong>{" "}
              <span>{new Date().toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        <div className="section1_titre">
          <h3>Bilans</h3>
        </div>

        <div
          className="traitement"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <p>
                <strong>BPO</strong>
              </p>
              <ul>
                {document.donnes &&
                  document.donnes.bpo &&
                  document.donnes.bpo.tp && <li>TP</li>}
                {document.donnes &&
                  document.donnes.bpo &&
                  document.donnes.bpo.gs && <li>GS</li>}
                {document.donnes &&
                  document.donnes.bpo &&
                  document.donnes.bpo.hiv && <li>HIV HBS HCV</li>}
                {document.donnes &&
                  document.donnes.bpo &&
                  document.donnes.bpo.bpo && <li>BPO</li>}
              </ul>
            </div>
            <div>
              <p>
                <strong>Hématologie</strong>
              </p>
              <ul>
                {document.donnes &&
                  document.donnes.hematologie &&
                  document.donnes.hematologie.fibrinogene && (
                    <li>Fibrinogene</li>
                  )}
                {document.donnes &&
                  document.donnes.hematologie &&
                  document.donnes.hematologie.tptck && <li>TP-TCK</li>}
                {document.donnes &&
                  document.donnes.hematologie &&
                  document.donnes.hematologie.gsh && <li>Gs</li>}
                {document.donnes &&
                  document.donnes.hematologie &&
                  document.donnes.hematologie.crp && <li>CRP</li>}
                {document.donnes &&
                  document.donnes.hematologie &&
                  document.donnes.hematologie.vitesse && (
                    <li>Vitesse de sedimentation</li>
                  )}
              </ul>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div>
              <p>
                <strong>Sérologie</strong>
              </p>
              <ul>
                {document.donnes &&
                  document.donnes.serologie &&
                  document.donnes.serologie.hivH && <li>HIV</li>}
                {document.donnes &&
                  document.donnes.serologie &&
                  document.donnes.serologie.miniVidas && <li>Mini Vidas</li>}
                {document.donnes &&
                  document.donnes.serologie &&
                  document.donnes.serologie.toxo && <li>Toxo G</li>}
              </ul>
            </div>
            <div>
              <p>
                <strong>Biochimie</strong>
              </p>
              <ul>
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.hgpo && <li>HGPO</li>}
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.proteine && <li>Proteinurie</li>}
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.ferserrique && (
                    <li>Fer Serrique</li>
                  )}
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.crp && <li>CRP</li>}
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.bilirubine && <li>Bilirubine</li>}
                {document.donnes &&
                  document.donnes.biochimie &&
                  document.donnes.biochimie.calcium && <li>Calcuim</li>}
              </ul>
            </div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <p>
              <strong>Hormonologie</strong>
            </p>
            <ul>
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.rubeole && <li>Rubeole</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.tsh && <li>TSH</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.vitamineD && <li>Vitamine D</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.psa && <li>PSA.T</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.prole2 && <li>ProlE2</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.miniVidasH && <li>Mini Vidas</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.hcg && <li>HCG</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.ft4 && <li>FT4</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.ft3 && <li>FT3</li>}
              {document.donnes &&
                document.donnes.hormonologie &&
                document.donnes.hormonologie.ferritine && <li>Ferritine</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="section2">
        <hr />
        <p>
          Etablissement Hospitalier Privé la Colombe Touares II Draa Ben Khedda{" "}
          <br />
          15100 Tizi-Ouzou
          <br />
          Mobile: 0550 96 95 65 - Tél/Fax: 026 43 32 22 / 026 43 33 22{" "}
        </p>
      </div>
    </div>
  );
};

export default Bilan;
