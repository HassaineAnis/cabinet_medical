import React, { useContext, useEffect, useState } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import "../../../style/laboAM/documentAM/tp.css";
import logo from "../../../assets/logo (1).png";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DocumentContext } from "../../../util/context/Context";
import format from "date-fns/format";

const CertificatMed = () => {
  const { documents, setDocuments } = useContext(DocumentContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [diagnostic, setDiagnostic] = useState("rien");
  const [maladie, setMaladie] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const saveDocument = () => {
    const documentData = {
      titre: "certificat de pneumo phtisiologie",
      donnes: {
        date: date,
        diagnostic: diagnostic,
        ...(diagnostic === "malade " && { maladie: maladie }),
      },
    };
    setDocuments([...documents, documentData]);
    navigate(-1);
  };
  const envoie = (e) => {
    e.preventDefault();
    saveDocument();
  };
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
  return (
    <div className="intervention">
      <div className="section1">
        <div className="tp" ref={componentRef}>
          <div className="partie1_container">
            <div className="entete" style={{ justifyContent: "center" }}>
              <h3>
                Etablissement Hospitalier Privé La Colombe <br />
                <span style={{ fontWeight: "400", fontSize: "1rem" }}>
                  Lot TOUARES II D B K 15100 TIZI-OUZOU <br /> Tel / Fax : 026
                  43 32 22 / 33 22 Mob: 0550 96 95 65
                </span>
              </h3>

              <img src={logo} alt="Logo Administration" />
            </div>

            <div className="partie1" style={{ justifyContent: "flex-end" }}>
              <p>
                <strong>DBK LE :</strong> <span>{`${date}`}</span>
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
                  {` ${patient && patient.nom}`}
                </p>
                <p>
                  <strong>Prénom</strong>
                  {` ${patient && patient.prenom}`}
                </p>
                <p>
                  <strong>Age :</strong>
                  {` ${patient && patient.age} `}
                  <strong>ans</strong>
                </p>
              </div>
              <p>
                <strong>Je soussigné,</strong>
              </p>

              <p style={{ textAlign: "center" }}>
                Déclare que le susnommé{" "}
                {diagnostic === "rien" &&
                  " aucune maladie cliniquement décelable "}
                {diagnostic === "malade" && `présente ${maladie} `}
                ce jour.
              </p>
              <br />
              <br />
              <br />
              <p style={{ textAlign: "center" }}>
                Certificat établi pour servir et faire valoir ce qui est de
                droit.
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
      </div>

      <div className="formulaire" style={{ alignSelf: "center" }}>
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
              <label htmlFor="diagnostic">Diagnostic</label>
              <select
                name="diagnostic"
                id="diagnostic"
                required
                onChange={(e) => setDiagnostic(e.target.value)}
                value={diagnostic}
              >
                <option value="rien">Rien a signalé </option>
                <option value="malade">Malade</option>
              </select>
            </div>
          </div>
          <div className="partie1">
            {diagnostic === "malade" && (
              <div className="input_container">
                <label htmlFor="maladie">Maladie</label>
                <input
                  type="text"
                  id="maladie"
                  required
                  onChange={(e) => setMaladie(e.target.value)}
                  value={maladie}
                />
              </div>
            )}
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
    </div>
  );
};

export default CertificatMed;
