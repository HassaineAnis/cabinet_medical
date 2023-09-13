import React, { useContext, useEffect, useState } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import "../../../style/laboAM/documentAM/tp.css";
import logo from "../../../assets/logo (1).png";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DocumentContext } from "../../../util/context/Context";
import format from "date-fns/format";

const Pelvienne = () => {
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

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [gsEpou, setGsEpou] = useState("A+");
  const [nomEpou, setNom] = useState("");
  const [gs, setGs] = useState("A+");
  const [vessie, setVessie] = useState("");
  const [Indication, setIndication] = useState("");
  const [echographie, setEchographie] = useState("");
  const [uterus, setUterus] = useState("");
  const [position, setPosition] = useState("");
  const [dimension, setDimension] = useState("");
  const [endometre, setEmdometre] = useState("");
  const [myometre, setMyometre] = useState("");
  const [droit, setDroit] = useState("");
  const [gauche, setgauche] = useState("");
  const [sac, setSac] = useState("");

  const [conclusion, setConclusion] = useState("");

  const saveDocument = () => {
    const documentData = {
      titre: "echographie pelvienne",
      donnes: {
        date: date,

        gs: gs,
        gsEpou: gsEpou,
        nomEpou: nomEpou,
        vessie: vessie,
        Indication: Indication,
        echographie: echographie,
        uterus: uterus,
        position: position,
        dimension: dimension,
        endometre: endometre,
        myometre: myometre,
        droit: droit,
        gauche: gauche,
        sac: sac,

        conclusion: conclusion,
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
                  <p style={{ margin: "0" }}>
                    <strong>Indication :</strong>
                    {` ${Indication}`}
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Echographie :</strong>
                    {` ${echographie}`}
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Vessie :</strong>
                    {` ${vessie}`}
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Utuérus :</strong>
                    {` ${uterus}`}
                  </p>
                  <div style={{ position: "relative", left: "3rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Position:</strong>
                      {` ${position}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Dimension:</strong>
                      {` ${dimension}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Endométre: </strong>
                      {` ${endometre}`}
                    </p>
                  </div>

                  <p style={{ margin: "0" }}>
                    <strong>Myomètre: </strong>
                    {` ${endometre}`}
                  </p>
                  <p style={{ margin: "0" }}>
                    <strong>Ovaires: </strong>
                  </p>
                  <div style={{ position: "relative", left: "3rem" }}>
                    <p style={{ margin: "0" }}>
                      <strong>Gauche: </strong>
                      {` ${gauche}`}
                    </p>
                    <p style={{ margin: "0" }}>
                      <strong>Droite: </strong>
                      {` ${droit}`}
                    </p>
                  </div>

                  <p style={{ margin: "0" }}>
                    <strong>Culs de sac :</strong>
                    {`${sac}`}
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
                  <label htmlFor="Indication">Indication</label>
                  <input
                    type="text"
                    id="Indication"
                    required
                    onChange={(e) => setIndication(e.target.value)}
                    value={Indication}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Echographie">Echographie</label>
                  <select
                    id="Echographie"
                    required
                    onChange={(e) => setEchographie(e.target.value)}
                    value={echographie}
                  >
                    <option value="">---choisi---</option>
                    <option value="Vaginale">Vaginale</option>
                    <option value="Abdominale">Abdominale</option>
                  </select>
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
                  <label htmlFor="Utuérus">Utuérus</label>
                  <input
                    type="text"
                    id="Utuérus"
                    required
                    onChange={(e) => setUterus(e.target.value)}
                    value={uterus}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    id="position"
                    required
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Dimension">Dimension</label>
                  <input
                    type="text"
                    id="Dimension"
                    required
                    onChange={(e) => setDimension(e.target.value)}
                    value={dimension}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Endomètre">Endomètre</label>
                  <input
                    type="date"
                    id="Endomètre"
                    required
                    onChange={(e) => setEmdometre(e.target.value)}
                    value={endometre}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Myomètre">Myomètre</label>
                  <input
                    type="text"
                    id="Myomètre"
                    required
                    onChange={(e) => setMyometre(e.target.value)}
                    value={myometre}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Ovaires droit">Ovaires droit</label>
                  <input
                    type="text"
                    id="Ovaires droit"
                    required
                    onChange={(e) => setDroit(e.target.value)}
                    value={droit}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Ovaires gauche">Ovaires gauche</label>
                  <input
                    type="text"
                    id="Ovaires gauche"
                    required
                    onChange={(e) => setgauche(e.target.value)}
                    value={gauche}
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="Culs de sac">Culs de sac</label>
                  <input
                    type="text"
                    id="Culs de sac"
                    onChange={(e) => setSac(e.target.value)}
                    value={sac}
                    required
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

export default Pelvienne;
