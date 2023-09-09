import React, { useContext, useEffect, useState } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import "../../../style/laboAM/documentAM/tp.css";
import logo from "../../../assets/logo (1).png";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DocumentContext } from "../../../util/context/Context";
import format from "date-fns/format";

const DebutGross = () => {
  const { documents, setDocuments } = useContext(DocumentContext);
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const { id } = useParams();

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [erreur, setErreur] = useState(false);

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

  const [dateDebut, setDateDebut] = useState("");
  const [ddr, setDdr] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [gsEpou, setGsEpou] = useState("");
  const [nomEpou, setNom] = useState("");
  const [gs, setGs] = useState("");
  const [g, setG] = useState("");
  const [p, setP] = useState("");
  const [a, setA] = useState("");
  const [c, setC] = useState("");
  const [poid, setPoid] = useState("");
  const [tension, setTension] = useState("");
  const [tpa, setTpa] = useState("");
  const [ddrc, setDdrc] = useState("");
  const [termeA, setTermeA] = useState("");
  const [termeC, setTermeC] = useState("");
  const [cardiaque, setCardiaque] = useState("");
  const [lcc, setLcc] = useState("");
  const [volume, setVolume] = useState("");
  const [aspect, setAspect] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [nombre, setNombre] = useState("");
  const saveDocument = () => {
    const documentData = {
      titre: "debut grossesse",
      donnes: {
        date: date,
        dateDebut: dateDebut,
        ddr: ddr,
        gs: gs,
        gsEpou: gsEpou,
        nomEpou: nomEpou,
        g: g,
        p: p,
        a: a,
        c: c,
        poid: poid,
        tension: tension,
        tpa: tpa,
        ddrc: ddrc,
        termeA: termeA,
        termeC: termeC,
        cardiaque: cardiaque,
        lcc: lcc,
        volume: volume,
        aspect: aspect,
        conclusion: conclusion,
        nombre: nombre,
      },
    };
    setDocuments([...documents, documentData]);
    navigate(-1);
  };
  const envoie = (e) => {
    e.preventDefault();
  };
  if (erreur) {
    return <div className="intervention">Erreur de chargment</div>;
  }
  return (
    <div className="intervention">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="section1">
            <div className="tp" ref={componentRef}>
              <div className="partie1_container">
                <div className="entete" style={{ justifyContent: "center" }}>
                  <h3>
                    Etablissement Hospitalier Privé La Colombe <br />
                    <span style={{ fontWeight: "400", fontSize: "1rem" }}>
                      Lot TOUARES II D B K 15100 TIZI-OUZOU <br /> Tel / Fax :
                      026 43 32 22 / 33 22 Mob: 0550 96 95 65
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
                    <strong>DBK LE :</strong> <span>{`${date}`}</span>
                  </p>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Nom & Prénom:</strong>
                      {` ${patient && patient.nom} ${
                        patient && patient.prenom
                      }`}
                    </p>
                    <p>
                      <strong>Age:</strong>
                      {` ${patient && patient.age}`}
                    </p>
                    <p>
                      <strong>Gs:</strong>
                      {` ${gs}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Nom de l'époux:</strong>
                      {` ${nomEpou}`}
                    </p>
                    <p>
                      <strong>Gs</strong>
                      {` ${gsEpou}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>G:</strong>
                      {` ${g}`}
                    </p>
                    <p>
                      <strong>P:</strong>
                      {` ${p}`}
                    </p>
                    <p>
                      <strong>A:</strong>
                      {` ${a}`}
                    </p>
                    <p>
                      <strong>C:</strong>
                      {` ${c}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Poid:</strong>
                      {` ${poid}`}
                    </p>
                    <p>
                      <strong>Tension Artériel:</strong>
                      {` ${tension}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>DDR:</strong>
                      {` ${ddr && new Date(ddr).toLocaleDateString()}`}
                    </p>
                    <p>
                      <strong>Terme Actuel:</strong>
                      {` ${termeA}`}
                    </p>
                    <p>
                      <strong>TPA:</strong>
                      {` ${tpa}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>DDRC:</strong>
                      {` ${ddrc}`}
                    </p>
                    <p>
                      <strong>Terme Corrigé:</strong>
                      {` ${termeC}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Date de début de grossesse:</strong>
                      {` ${
                        dateDebut && new Date(dateDebut).toLocaleDateString()
                      }`}
                    </p>
                    <p>
                      <strong>Nombre de fœtus:</strong>
                      {` ${nombre}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Activité cardiaque:</strong>
                      {` ${cardiaque}`}
                    </p>
                    <p>
                      <strong>LCC:</strong>
                      {` ${lcc}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p>
                      <strong>Volume amniotique:</strong>
                      {` ${volume}`}
                    </p>
                    <p>
                      <strong>Aspect du placenta:</strong>
                      {` ${aspect}`}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Conclusion:</strong>
                      {` ${conclusion}`}
                    </p>
                  </div>

                  <div className="bas-page">
                    <hr className="no_print" />
                    <p>
                      Etablissement Hospitalier Privé la Colombe Touares II Draa
                      Ben Khedda <br />
                      15100 Tizi-Ouzou
                      <br />
                      Mobile: 0550 96 95 65 - Tél/Fax: 026 43 32 22 / 026 43 33
                      22{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="formulaire" style={{ alignSelf: "flex-start" }}>
            <form onSubmit={envoie}>
              <div className="partie1">
                <div className="input_container">
                  <label htmlFor="datet">Date</label>
                  <input
                    type="date"
                    name="datet"
                    id="datet"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="gs">GS</label>
                  <select
                    name="gs"
                    id="gs"
                    required
                    onChange={(e) => setGs(e.target.value)}
                    value={gs}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-+">AB-</option>
                  </select>
                </div>
                <div className="input_container">
                  <label htmlFor="epou">Nom de l'epoux</label>
                  <input
                    type="text"
                    id="epou"
                    required
                    onChange={(e) => setNom(e.target.value)}
                    value={nomEpou}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="gsp">GS de l'epoux</label>
                  <select
                    name="gsp"
                    id="gsp"
                    onChange={(e) => setGsEpou(e.target.value)}
                    value={gsEpou}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-+">AB-</option>
                  </select>
                </div>
                <div className="input_container">
                  <label htmlFor="g">G</label>
                  <input
                    type="text"
                    id="g"
                    required
                    onChange={(e) => setG(e.target.value)}
                    value={g}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="p">P</label>
                  <input
                    type="text"
                    id="p"
                    required
                    onChange={(e) => setP(e.target.value)}
                    value={p}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="a">A</label>
                  <input
                    type="text"
                    id="a"
                    required
                    onChange={(e) => setA(e.target.value)}
                    value={a}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="c">C</label>
                  <input
                    type="text"
                    id="c"
                    required
                    onChange={(e) => setC(e.target.value)}
                    value={c}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="poid">Poid</label>
                  <input
                    type="text"
                    id="poit"
                    required
                    onChange={(e) => setPoid(e.target.value)}
                    value={poid}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="tension">Tension Artérielle</label>
                  <input
                    type="text"
                    id="epou"
                    required
                    onChange={(e) => setTension(e.target.value)}
                    value={tension}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="ddr">DDR</label>
                  <input
                    type="date"
                    id="ddr"
                    required
                    onChange={(e) => setDdr(e.target.value)}
                    value={ddr}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="tpa">TPA</label>
                  <input
                    type="text"
                    id="tpa"
                    required
                    onChange={(e) => setTpa(e.target.value)}
                    value={tpa}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="terme">Terme Actuel</label>
                  <input
                    type="text"
                    id="terme"
                    required
                    onChange={(e) => setTermeA(e.target.value)}
                    value={termeA}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="ddrc">DDRC</label>
                  <input
                    type="text"
                    id="ddrc"
                    required
                    onChange={(e) => setDdrc(e.target.value)}
                    value={ddrc}
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="terme">Terme Corrigé</label>
                  <input
                    type="text"
                    id="terme"
                    required
                    onChange={(e) => setTermeC(e.target.value)}
                    value={termeC}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="dateGrossesse">
                    Date de début de grossesse
                  </label>
                  <input
                    type="date"
                    id="dateGrossesse"
                    required
                    onChange={(e) => setDateDebut(e.target.value)}
                    value={dateDebut}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="foetus">Nombre de foetus</label>
                  <input
                    type="nombre"
                    id="foetus"
                    required
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="cardiaque">Activité cardiaque</label>
                  <input
                    type="text"
                    id="cardiaque"
                    required
                    onChange={(e) => setCardiaque(e.target.value)}
                    value={cardiaque}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="lcc">LCC</label>
                  <input
                    type="text"
                    id="lcc"
                    required
                    onChange={(e) => setLcc(e.target.value)}
                    value={lcc}
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="volume">Volume amniotique</label>
                  <input
                    type="text"
                    id="volume"
                    required
                    onChange={(e) => setVolume(e.target.value)}
                    value={volume}
                  />
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="aspect">Aspect du placenta</label>
                  <input
                    type="text"
                    id="aspect"
                    required
                    onChange={(e) => setAspect(e.target.value)}
                    value={aspect}
                  />
                </div>
              </div>
              <div className="partie1">
                <div className="input_container">
                  <label htmlFor="conclusion">Conclusion</label>
                  <input
                    type="text"
                    id="conclusion"
                    required
                    onChange={(e) => setConclusion(e.target.value)}
                    value={conclusion}
                  />
                </div>
              </div>
              <div className="btn">
                <div className="btn_save">
                  <button onClick={saveDocument}>Enregisté</button>
                  <span onClick={navigation}>Annuler</span>
                </div>
                <span onClick={handlePrint}>Imprimer</span>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default DebutGross;
