import React from "react";
import logo from "../../../assets/logo (1).png";
import "../../../style/medecinStyle/documentMedical/ordonnance.css";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../style/loader/loader.css";

import { DocumentContext } from "../../../util/context/Context";

const Bilan = () => {
  const { documents, setDocuments } = useContext(DocumentContext);

  const componentRef = React.useRef();
  const [traitement, setTraitement] = useState([]);

  const { id } = useParams();

  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/Patient/details/${id}`
        );

        const patient = await response.json();

        setPatient(patient);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const envoie = (e) => {
    e.preventDefault();
  };

  const saveDocument = () => {
    const documentData = {
      titre: "Bilans",
      donnes: {
        bpo: { ...bpo },
        hematologie: { ...hematologie },
        serologie: { ...serologie },
        biochimie: { ...biochimie },
        hormonologie: { ...hormonologie },
      },
    };
    setDocuments([...documents, documentData]);
    navigate(-1);
  };
  const [bpo, setBpo] = useState({
    tp: false,
    gs: false,
    hiv: false,
    bpo: false,
  });

  const [serologie, setSerologie] = useState({
    hivH: false,
    miniVidas: false,
    toxo: false,
  });
  const [biochimie, setBiochimie] = useState({
    hgpo: false,
    proteine: false,
    ferserrique: false,
    crp: false,
    bilirubine: false,
    calcium: false,
  });

  const [hematologie, setHematologie] = useState({
    fibrinogene: false,
    tptck: false,
    gsh: false,
    crp: false,
    vitesse: false,
    // Ajoutez d'autres cases pour la section Hématologie ici
  });

  const [hormonologie, setHormonologie] = useState({
    rubeole: false,
    tsh: false,
    vitamineD: false,
    psa: false,
    prole2: false,
    miniVidasH: false,
    hcg: false,
    ft4: false,
    ft3: false,
    ferritine: false,
    // Ajoutez d'autres cases pour la section Hormonologie ici
  });
  const handleCheckboxChange = (section, name, checked) => {
    switch (section) {
      case "BPO":
        setBpo({
          ...bpo,
          [name]: checked,
        });
        break;
      case "Serologie":
        setSerologie({
          ...serologie,
          [name]: checked,
        });
        break;
      case "biochimie":
        setBiochimie({
          ...biochimie,
          [name]: checked,
        });
        break;
      case "hormonologie":
        setHormonologie({
          ...hormonologie,
          [name]: checked,
        });
        break;
      case "hematologie":
        setHematologie({
          ...hematologie,
          [name]: checked,
        });
        break;
      // Ajoutez d'autres cas pour les autres sections ici
      default:
        break;
    }
  };
  console.log(bpo);
  if (erreur) {
    return <div className="ordonnance">Erreur de chargement.</div>;
  }

  return (
    <div
      className="ordonnance"
      style={{ height: "max-content", minHeight: "100%" }}
    >
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div
            className="ord_c"
            style={{ height: "max-content", minHeight: "100%" }}
          >
            <div className="ordonnance_Container" ref={componentRef}>
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
                      <strong>Nom :</strong> <span>{patient.nom}</span>
                    </p>
                    <p>
                      <strong>Prénom :</strong> <span>{patient.prenom}</span>
                    </p>
                    <p>
                      <strong>Age :</strong> <span>{patient.age} ans</span>
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
                        {bpo.tp && <li>TP</li>}
                        {bpo.gs && <li>GS</li>}
                        {bpo.hiv && <li>HIV HBS HCV</li>}
                        {bpo.bpo && <li>BPO</li>}
                      </ul>
                    </div>
                    <div>
                      <p>
                        <strong>Hématologie</strong>
                      </p>
                      <ul>
                        {hematologie.fibrinogene && <li>Fibrinogene</li>}
                        {hematologie.tptck && <li>TP-TCK</li>}
                        {hematologie.gsh && <li>Gs</li>}
                        {hematologie.crp && <li>CRP</li>}
                        {hematologie.vitesse && (
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
                        {serologie.hivH && <li>HIV</li>}
                        {serologie.miniVidas && <li>Mini Vidas</li>}
                        {serologie.toxo && <li>Toxo G</li>}
                      </ul>
                    </div>
                    <div>
                      <p>
                        <strong>Biochimie</strong>
                      </p>
                      <ul>
                        {biochimie.hgpo && <li>HGPO</li>}
                        {biochimie.proteine && <li>Proteinurie</li>}
                        {biochimie.ferserrique && <li>Fer Serrique</li>}
                        {biochimie.crp && <li>CRP</li>}
                        {biochimie.bilirubine && <li>Bilirubine</li>}
                        {biochimie.calcium && <li>Calcuim</li>}
                      </ul>
                    </div>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    <p>
                      <strong>Hormonologie</strong>
                    </p>
                    <ul>
                      {hormonologie.rubeole && <li>Rubeole</li>}
                      {hormonologie.tsh && <li>TSH</li>}
                      {hormonologie.vitamineD && <li>Vitamine D</li>}
                      {hormonologie.psa && <li>PSA.T</li>}
                      {hormonologie.prole2 && <li>ProlE2</li>}
                      {hormonologie.miniVidasH && <li>Mini Vidas</li>}
                      {hormonologie.hcg && <li>HCG</li>}
                      {hormonologie.ft4 && <li>FT4</li>}
                      {hormonologie.ft3 && <li>FT3</li>}
                      {hormonologie.ferritine && <li>Ferritine</li>}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="section2">
                <hr />
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

          <form
            className="no-print"
            onSubmit={envoie}
            style={{ alignSelf: "flex-start" }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>BPO:</strong>
                <label htmlFor="tp">
                  <input
                    type="checkbox"
                    id="tp"
                    name="tp"
                    checked={bpo.tp}
                    onChange={(e) =>
                      handleCheckboxChange("BPO", "tp", e.target.checked)
                    }
                  />{" "}
                  TP
                </label>
                <label htmlFor="gs">
                  <input
                    type="checkbox"
                    id="gs"
                    name="gs"
                    checked={bpo.gs}
                    onChange={(e) =>
                      handleCheckboxChange("BPO", "gs", e.target.checked)
                    }
                  />{" "}
                  GS
                </label>
                <label htmlFor="hiv">
                  <input
                    type="checkbox"
                    id="hiv"
                    name="hiv"
                    checked={bpo.hiv}
                    onChange={(e) =>
                      handleCheckboxChange("BPO", "hiv", e.target.checked)
                    }
                  />{" "}
                  HIV HBS HCV
                </label>
                <label htmlFor="bpo">
                  <input
                    type="checkbox"
                    id="bpo"
                    name="bpo"
                    checked={bpo.bpo}
                    onChange={(e) =>
                      handleCheckboxChange("BPO", "bpo", e.target.checked)
                    }
                  />{" "}
                  BPO
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>Sérologie:</strong>
                <label htmlFor="hivH">
                  <input
                    type="checkbox"
                    id="hivH"
                    name="hivH"
                    checked={serologie.hiv}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "Serologie",
                        "hivH",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Hiv
                </label>
                <label htmlFor="miniVidas">
                  <input
                    type="checkbox"
                    id="miniVidas"
                    name="miniVidas"
                    checked={serologie.miniVidas}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "Serologie",
                        "miniVidas",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Mini Vidas
                </label>
                <label htmlFor="toxo">
                  <input
                    type="checkbox"
                    id="toxo"
                    name="toxo"
                    checked={serologie.toxo}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "Serologie",
                        "toxo",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Toxo G
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>Biochimie:</strong>
                <label htmlFor="hgpo">
                  <input
                    type="checkbox"
                    id="hgpo"
                    name="hgpo"
                    checked={biochimie.hgpo}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "biochimie",
                        "hgpo",
                        e.target.checked
                      )
                    }
                  />
                  HGPO
                </label>
                <label htmlFor="proteine">
                  <input
                    type="checkbox"
                    id="proteine"
                    name="proteine"
                    checked={biochimie.proteine}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "biochimie",
                        "proteine",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Proteinurie
                </label>

                <label htmlFor="ferserrique">
                  <input
                    type="checkbox"
                    id="ferserrique"
                    name="ferserrique"
                    checked={biochimie.ferserrique}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "biochimie",
                        "ferserrique",
                        e.target.checked
                      )
                    }
                  />{" "}
                  FerSerrique
                </label>
                <label htmlFor="crp">
                  <input
                    type="checkbox"
                    id="crp"
                    name="crp"
                    checked={biochimie.crp}
                    onChange={(e) =>
                      handleCheckboxChange("biochimie", "crp", e.target.checked)
                    }
                  />{" "}
                  CRP
                </label>
                <label htmlFor="bilirubine">
                  <input
                    type="checkbox"
                    id="bilirubine"
                    name="bilirubine"
                    checked={biochimie.bilirubine}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "biochimie",
                        "bilirubine",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Bilirubine
                </label>
                <label htmlFor="calcuim">
                  <input
                    type="checkbox"
                    id="calcuim"
                    name="calcuim"
                    checked={biochimie.calcium}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "biochimie",
                        "calcium",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Calcuim
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>Hématologie:</strong>
                <label htmlFor="fibrinogene">
                  <input
                    type="checkbox"
                    id="fibrinogene"
                    name="fibrinogene"
                    checked={hematologie.fibrinogene}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hematologie",
                        "fibrinogene",
                        e.target.checked
                      )
                    }
                  />
                  Fibrinogene
                </label>
                <label htmlFor="tp-tck">
                  <input
                    type="checkbox"
                    id="tp-tck"
                    name="tp-tck"
                    checked={hematologie.tptck}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hematologie",
                        "tptck",
                        e.target.checked
                      )
                    }
                  />{" "}
                  TP-TCK
                </label>

                <label htmlFor="gsH">
                  <input
                    type="checkbox"
                    id="gsH"
                    name="gsH"
                    checked={hematologie.gsh}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hematologie",
                        "gsh",
                        e.target.checked
                      )
                    }
                  />{" "}
                  GS
                </label>
                <label htmlFor="crp">
                  <input
                    type="checkbox"
                    id="crp"
                    name="crp"
                    checked={hematologie.crp}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hematologie",
                        "crp",
                        e.target.checked
                      )
                    }
                  />{" "}
                  CRP
                </label>
                <label htmlFor="vitesse">
                  <input
                    type="checkbox"
                    id="vitesse"
                    name="vitesse"
                    checked={hematologie.vitesse}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hematologie",
                        "vitesse",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Vitesse de sedimentation
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>Hormonologie:</strong>
                <label htmlFor="rubeole">
                  <input
                    type="checkbox"
                    id="rubeole"
                    name="rubeole"
                    checked={hormonologie.rubeole}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "rubeole",
                        e.target.checked
                      )
                    }
                  />
                  Rubeole
                </label>
                <label htmlFor="tsh">
                  <input
                    type="checkbox"
                    id="tsh"
                    name="tsh"
                    checked={hormonologie.tsh}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "tsh",
                        e.target.checked
                      )
                    }
                  />{" "}
                  TSH
                </label>

                <label htmlFor="vitamineD">
                  <input
                    type="checkbox"
                    id="vitamineD"
                    name="vitamineD"
                    checked={hormonologie.vitamineD}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "vitamineD",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Vitamine D
                </label>
                <label htmlFor="psa">
                  <input
                    type="checkbox"
                    id="psa"
                    name="psa"
                    checked={hormonologie.psa}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "psa",
                        e.target.checked
                      )
                    }
                  />{" "}
                  PSA.T
                </label>
                <label htmlFor="prolE2">
                  <input
                    type="checkbox"
                    id="prolE2"
                    name="prolE2"
                    checked={hormonologie.prole2}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "prole2",
                        e.target.checked
                      )
                    }
                  />{" "}
                  ProlE2
                </label>
                <label htmlFor="miniVidasH">
                  <input
                    type="checkbox"
                    id="miniVidasH"
                    name="miniVidasH"
                    checked={hormonologie.miniVidasH}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "miniVidasH",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Mini Vidas
                </label>
                <label htmlFor="HCG">
                  <input
                    type="checkbox"
                    id="HCG"
                    name="HCG"
                    checked={hormonologie.hcg}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "hcg",
                        e.target.checked
                      )
                    }
                  />{" "}
                  HCG
                </label>
                <label htmlFor="FT4">
                  <input
                    type="checkbox"
                    id="FT4"
                    name="FT4"
                    checked={hormonologie.ft4}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "ft4",
                        e.target.checked
                      )
                    }
                  />{" "}
                  FT4
                </label>
                <label htmlFor="FT3">
                  <input
                    type="checkbox"
                    id="FT3"
                    name="FT3"
                    checked={hormonologie.ft3}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "ft3",
                        e.target.checked
                      )
                    }
                  />{" "}
                  FT3
                </label>
                <label htmlFor="ferritine">
                  <input
                    type="checkbox"
                    id="ferritine"
                    name="ferritine"
                    checked={hormonologie.ferritine}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "hormonologie",
                        "ferritine",
                        e.target.checked
                      )
                    }
                  />{" "}
                  Ferritine
                </label>
              </div>
            </div>
            <div className="btn">
              <div className="btn_1">
                <button onClick={saveDocument}>Enregistré</button>
                <button
                  onClick={(e) => {
                    navigate(-1);
                  }}
                >
                  Annuler
                </button>
              </div>
              <div className="print" onClick={handlePrint}>
                Imprimer
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={30}
                  width={30}
                  viewBox="0 0 512 512"
                  fill="#fff"
                >
                  <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                </svg>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Bilan;
