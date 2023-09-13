import React, { useContext, useEffect, useState } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import "../../../style/laboAM/documentAM/tp.css";
import logo from "../../../assets/logo (1).png";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DocumentContext } from "../../../util/context/Context";
import format from "date-fns/format";

const Obstetricale = () => {
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

  const [ddr, setDdr] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [gsEpou, setGsEpou] = useState("A+");
  const [nomEpou, setNom] = useState("");
  const [gs, setGs] = useState("A+");
  const [g, setG] = useState("");
  const [p, setP] = useState("");
  const [a, setA] = useState("");
  const [c, setC] = useState("");
  const [poid, setPoid] = useState("");
  const [tension, setTension] = useState("");
  const [tpa, setTpa] = useState("");
  const [termeA, setTermeA] = useState("");
  const [presentation, setPresentation] = useState("");
  const [vitalite, setVitalite] = useState("");
  const [cn, setCn] = useState("");
  const [lf, setLf] = useState("");
  const [bip, setBip] = useState("");
  const [ct, setCt] = useState("");
  const [pa, setPa] = useState("");
  const [coeur, setCoeur] = useState("");
  const [lcc, setLcc] = useState("");
  const [cavite, setCavite] = useState("");
  const [vaisseau, setVaisseau] = useState("");
  const [rachis, setRachis] = useState("");
  const [vessie, setVessie] = useState("");
  const [reins, setReins] = useState("");
  const [estomac, setEstomac] = useState("");
  const [membre, setMembre] = useState("");
  const [placenta, setPlacenta] = useState("");
  const [liquide, setLiquide] = useState("");
  const [cardon, setCardon] = useState("");

  const [conclusion, setConclusion] = useState("");
  const [nombre, setNombre] = useState("");
  const saveDocument = () => {
    const documentData = {
      titre: "echographie obstétricale",
      donnes: {
        date: date,

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
        coeur: coeur,
        termeA: termeA,
        presentation: presentation,
        vitalite: vitalite,
        cn: cn,
        lf: lf,
        bip: bip,
        ct: ct,
        pa: pa,
        lcc: lcc,
        cavite: cavite,
        vaisseau: vaisseau,
        rachis: rachis,
        vessie: vessie,
        reins: reins,
        estomac: estomac,
        membre: membre,
        liquide: liquide,
        placenta: placenta,
        cardon: cardon,

        conclusion: conclusion,
        nombre: nombre,
      },
    };
    setDocuments([...documents, documentData]);
    navigate(-1);
  };
  const envoie = (e) => {
    e.preventDefault();
    saveDocument();
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
                      COMPTE RENDU D'ECHOGRAPHIE OBSTETRICALE
                    </strong>
                  </h2>
                </div>
                <div className="partie2">
                  <p style={{ textAlign: "right" }}>
                    <strong>DBK LE :</strong> <span>{`${date}`}</span>
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Nom & Prénom:</strong>
                      {` ${patient && patient.nom} ${
                        patient && patient.prenom
                      }`}
                    </p>
                    <p style={{ margin: "0" }}>
                      {" "}
                      <strong>Age:</strong>
                      {` ${patient && patient.age}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Gs:</strong>
                      {` ${gs}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Nom de l'époux:</strong>
                      {` ${nomEpou}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Gs</strong>
                      {` ${gsEpou}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>G:</strong>
                      {` ${g}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>P:</strong>
                      {` ${p}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>A:</strong>
                      {` ${a}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>C:</strong>
                      {` ${c}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Poid:</strong>
                      {` ${poid}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Tension Artériel:</strong>
                      {` ${tension}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>DDR:</strong>
                      {` ${ddr && new Date(ddr).toLocaleDateString()}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Terme Actuel:</strong>
                      {` ${termeA}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>TPA:</strong>
                      {` ${tpa}`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Nombre de fœtus :</strong>
                      {` ${nombre}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Présentation:</strong>
                      {` ${presentation}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Vitalité:</strong>
                      {` ${vitalite}`}
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
                    <span style={{ textDecoration: "underline" }}>
                      BIOMETRIE
                    </span>
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
                        {` ${lcc} mm`}
                      </p>
                      <p style={{ margin: "0" }}>
                        <strong>CN:</strong>
                        {` ${cn} mm`}
                      </p>
                      <p style={{ margin: "0" }}>
                        <strong>LF:</strong>
                        {` ${lf} mm`}
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
                        {` ${bip} mm`}
                      </p>
                      <p style={{ margin: "0" }}>
                        <strong>CT:</strong>
                        {` ${ct} mm`}
                      </p>
                      <p style={{ margin: "0" }}>
                        <strong>PA:</strong>
                        {` ${pa} mm`}
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
                    <span style={{ textDecoration: "underline" }}>
                      MORPHOLOGIE
                    </span>
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Position du coeur:</strong>
                      {` ${coeur}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Cavités :</strong>
                      {` ${cavite}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Vaisseaux :</strong>
                      {` ${vaisseau}`}
                    </p>
                  </div>
                  <p style={{ margin: "0" }}>
                    <strong>Rachis :</strong>
                    {` ${rachis}`}
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Reins :</strong>
                    {` ${reins}`}
                  </p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Vessie:</strong>
                      {` ${vessie}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Estomac :</strong>
                      {` ${estomac}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Membres :</strong>
                      {` ${membre}`}
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
                    {` ${placenta}`}
                  </p>{" "}
                  <p style={{ margin: "0" }}>
                    <strong>Liquide amniotique :</strong>
                    {` ${liquide}`}
                  </p>{" "}
                  <p style={{ margin: "0" }}>
                    <strong>Cardon :</strong>
                    {` ${cardon}`}
                  </p>
                  <div>
                    <p style={{ margin: "0" }}>
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
                  <label htmlFor="foetus">Nombre de foetus</label>
                  <input
                    type="number"
                    id="foetus"
                    required
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="presentation">Présentation</label>
                  <input
                    type="text"
                    id="presentation"
                    onChange={(e) => setPresentation(e.target.value)}
                    value={presentation}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="validite">Vitalité</label>
                  <input
                    type="text"
                    id="validite"
                    onChange={(e) => setVitalite(e.target.value)}
                    value={vitalite}
                    required
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
                </div>
                <div className="input_container">
                  <label htmlFor="cd">CN</label>
                  <input
                    type="text"
                    id="cd"
                    onChange={(e) => setCn(e.target.value)}
                    value={cn}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="lf">LF</label>
                  <input
                    type="text"
                    id="lf"
                    onChange={(e) => setLf(e.target.value)}
                    value={lf}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="bip">BIP</label>
                  <input
                    type="text"
                    id="bip"
                    onChange={(e) => setBip(e.target.value)}
                    value={bip}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="ct">CT</label>
                  <input
                    type="text"
                    id="ct"
                    onChange={(e) => setCt(e.target.value)}
                    value={ct}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="pa">PA</label>
                  <input
                    type="text"
                    id="pa"
                    required
                    onChange={(e) => setPa(e.target.value)}
                    value={pa}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Position du cœur">Position du cœur</label>
                  <input
                    type="text"
                    id="Position du cœur"
                    required
                    onChange={(e) => setCoeur(e.target.value)}
                    value={coeur}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="cavite">Cavités</label>
                  <input
                    type="text"
                    id="cavite"
                    required
                    onChange={(e) => setCavite(e.target.value)}
                    value={cavite}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="vaisseaux">Vaisseaux</label>
                  <input
                    type="text"
                    id="vaisseaux"
                    onChange={(e) => setVaisseau(e.target.value)}
                    value={vaisseau}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="rachis">Rachis</label>
                  <input
                    type="text"
                    id="rachis"
                    required
                    onChange={(e) => setRachis(e.target.value)}
                    value={rachis}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="reins">Reins</label>
                  <input
                    type="text"
                    id="reins"
                    required
                    onChange={(e) => setReins(e.target.value)}
                    value={reins}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="vessie">Vessie</label>
                  <input
                    type="text"
                    id="vessie"
                    required
                    onChange={(e) => setVessie(e.target.value)}
                    value={vessie}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="estomac">Estomac</label>
                  <input
                    type="text"
                    id="estomac"
                    required
                    onChange={(e) => setEstomac(e.target.value)}
                    value={estomac}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="menbre">Membres</label>
                  <input
                    type="text"
                    id="menbre"
                    required
                    onChange={(e) => setMembre(e.target.value)}
                    value={membre}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="placenta">Placenta</label>
                  <input
                    type="text"
                    id="placenta"
                    required
                    onChange={(e) => setPlacenta(e.target.value)}
                    value={placenta}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="liquide">Liquide amniotique</label>
                  <input
                    type="text"
                    id="liquide"
                    required
                    onChange={(e) => setLiquide(e.target.value)}
                    value={liquide}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="cardon">Cardon</label>
                  <input
                    type="text"
                    id="cardon"
                    required
                    onChange={(e) => setCardon(e.target.value)}
                    value={cardon}
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
                  <button>Enregisté</button>
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
export default Obstetricale;
