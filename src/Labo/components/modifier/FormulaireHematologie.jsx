import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BpoContext } from "../../../util/context/Context";
import { format } from "date-fns";
import notification from "../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

const FormulaireHematologie = ({ imprimer, type }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);
  const { id } = useParams();
  const [data, setData] = useState({});

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  const {
    date,
    setDate,
    tempProth,
    setTemp,
    taux,
    setTaux,
    inr,
    setInr,
    tck,
    setTck,
    service,
    setService,
    crp,
    setCrp,
    fibrinogene,
    setFibrinogene,
    wrose,
    setWrose,
    latex,
    setLatex,
    aslo,
    setAslo,
    gs,
    setGs,
    rhesus,
    setRhesus,
  } = useContext(BpoContext);
  useEffect(() => {
    const fetchAnalyse = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:3000/api/analyse/details/${id}`
        );

        const analyse = await response.json();
        setData(analyse);
        setDate(format(new Date(analyse.date), "yyyy-MM-dd"));
        setService(analyse.service);
        setTaux(analyse.document.data.taux);
        setTemp(analyse.document.data.tempProth);
        setTck(analyse.document.data.tck);
        setInr(analyse.document.data.inr);
        setCrp(analyse.document.data.crp);
        setFibrinogene(analyse.document.data.fibrinogene);
        setWrose(analyse.document.data.wrose);
        setLatex(analyse.document.data.latex);
        setAslo(analyse.document.data.aslo);
        setGs(analyse.document.data.gs);
        setRhesus(analyse.document.data.rhesus);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyse();
    return () => {
      setDate(format(new Date(), "yyyy-MM-dd"));

      setTaux("");
      setTemp("");
      setTck("");
      setInr("");
      setCrp("");
      setFibrinogene("");
      setWrose("");
      setLatex("");
      setAslo("");
      setGs("");
      setRhesus("");
    };
  }, []);
  const verifierData = (e) => {
    e.preventDefault();

    openModal();
  };
  const envoyerData = async () => {
    closeModal();
    const documentData = {
      laborantin: jeton.id,
      date: date,
      service: service,
      typeAnalyse: "biochimie",
      patient: data.patient && data.patient._id,
      document: {
        nom: type,
        data: {
          ...(tempProth && { tempProth: tempProth }),
          ...(taux && { taux: taux }),
          ...(tck && { tck: tck }),
          ...(inr && { inr: inr }),
          ...(fibrinogene && { fibrinogene: fibrinogene }),
          ...(wrose && { wrose: wrose }),
          ...(latex && { latex: latex }),
          ...(aslo && { aslo: aslo }),
          ...(crp && { crp: crp }),
          ...(gs && { gs: gs }),
          ...(rhesus && { rhesus: rhesus }),
        },
      },
    };
    try {
      const response = await fetch(`http://localhost:3000/api/analyse/${id}`, {
        method: "PUT",
        body: JSON.stringify(documentData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("document modifier avec succés.");
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de la modification du document.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };
  return (
    <form onSubmit={verifierData}>
      {" "}
      <div
        className="partie1"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
        }}
      >
        <div className="input_container">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            required
          />
        </div>

        <div className="input_container">
          <label htmlFor="service">Sérvice</label>
          <select
            name="service"
            id="service"
            onChange={(e) => setService(e.target.value)}
            value={service}
          >
            <option value="Interne">Interne</option>
            <option value="Externe">Externe</option>
          </select>
        </div>
        {type === "Gs" && (
          <>
            <div className="input_container">
              <label htmlFor="gs">Groupe sanguin</label>
              <select
                type="gs"
                id="gs"
                onChange={(e) => setGs(e.target.value)}
                value={gs}
                required
              >
                <option value="">---choisi un groupe sanguin---</option>
                <option value="O">O</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
              </select>
            </div>
            <div className="input_container">
              <label htmlFor="rhesus">Rhésus</label>
              <select
                type="rhesus"
                id="rhesus"
                required
                onChange={(e) => setRhesus(e.target.value)}
                value={rhesus}
              >
                <option value="">---choisi un rhésus---</option>
                <option value="Rh+">Rh+</option>
                <option value="Rh-">Rh-</option>
              </select>
            </div>
          </>
        )}
        {type === "fibrinogene" && (
          <div className="input_container">
            <label htmlFor="fibrinogene">Fibrinogene</label>
            <input
              type="text"
              id="fibrinogene"
              onChange={(e) => setFibrinogene(e.target.value)}
              value={fibrinogene}
              required
            />
          </div>
        )}
        {type === "tp-tck" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="temps">Temps de Prothrombine</label>
              <input
                type="text"
                id="temps"
                onChange={(e) => setTemp(e.target.value)}
                value={tempProth}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="taux">Taux{"(%)"}</label>
              <input
                type="text"
                id="taux"
                onChange={(e) => setTaux(e.target.value)}
                value={taux}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="inr">INR</label>
              <input
                type="text"
                id="inr"
                onChange={(e) => setInr(e.target.value)}
                value={inr}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="tck">TCK</label>
              <input
                type="text"
                id="tck"
                onChange={(e) => setTck(e.target.value)}
                value={tck}
                required
              />
            </div>
          </>
        )}
        {type === "vitesse" && (
          <>
            <div className="input_container">
              <label htmlFor="CRP">CRP</label>
              <input
                type="text"
                id="CRP"
                onChange={(e) => setCrp(e.target.value)}
                value={crp}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="aslo">ASLO</label>
              <input
                type="text"
                id="aslo"
                onChange={(e) => setAslo(e.target.value)}
                value={aslo}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="latex">LATEX</label>
              <input
                type="text"
                id="latex"
                value={latex}
                onChange={(e) => setLatex(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="rose"> W ROSE</label>
              <input
                type="text"
                id="rose"
                onChange={(e) => setWrose(e.target.value)}
                value={wrose}
                required
              />
            </div>
          </>
        )}
      </div>{" "}
      <div className="btn">
        <div className="btn_save">
          <button>Enregisté</button>
          <span onClick={navigation}>Annuler</span>
        </div>
        <span onClick={imprimer}>Imprimer</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
          },
        }}
      >
        <p> voullez vous enregistré ces informations?</p>
        <div className="repense">
          <button onClick={envoyerData}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </form>
  );
};

export default FormulaireHematologie;
