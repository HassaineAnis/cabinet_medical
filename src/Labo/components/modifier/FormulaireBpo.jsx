import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BpoContext } from "../../../util/context/Context";
import notification from "../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { format } from "date-fns";

const FormulaireBpo = ({ imprimer, type }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const { id } = useParams();

  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  const {
    glucose,
    setGlucose,
    uree,
    setUree,
    creatinemie,
    setCreatinemie,
    service,
    setService,
    date,
    setDate,
    taux,
    setTaux,
    tempProth,
    setTemp,
    inr,
    setInr,
    tck,
    setTck,
    hiv,
    setHiv,
    hbs,
    setHbs,
    hcv,
    setHcv,
    bw,
    setBw,
    gs,
    setGs,
    rhesus,
    setRhesus,
  } = useContext(BpoContext);
  const [data, setData] = useState({});

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    const fetchRdv = async () => {
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
        setInr(analyse.document.data.inr);
        setTck(analyse.document.data.tck);
        setCreatinemie(analyse.document.data.creatinemie);
        setHiv(analyse.document.data.hiv);
        setHbs(analyse.document.data.hbs);
        setHcv(analyse.document.data.hcv);
        setGlucose(analyse.document.data.glucose);
        setTemp(analyse.document.data.temps);
        setUree(analyse.document.data.uree);
        setBw(analyse.document.data.bw);
        setGs(analyse.document.data.gs);
        setRhesus(analyse.document.data.rhesus);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRdv();
    return () => {
      setTaux("");
      setInr("");
      setTck("");
      setCreatinemie("");
      setHiv("");
      setHbs("");
      setHcv("");
      setGlucose("");
      setTemp("");
      setUree("");
      setBw("");
      setGs("");
      setRhesus("");
    };
  }, [id]);
  console.log(creatinemie);
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
      typeAnalyse: "B.P.O",
      patient: data.patient && data.patient._id,
      document: {
        nom: type,
        data: {
          ...(tempProth && { temps: tempProth }),
          ...(taux && { taux: taux }),
          ...(inr && { inr: inr }),
          ...(tck && { tck: tck }),
          ...(glucose && { glucose: glucose }),
          ...(uree && { uree: uree }),
          ...(creatinemie && { creatinemie: creatinemie }),
          ...(hiv && { hiv: hiv }),
          ...(hbs && { hbs: hbs }),
          ...(hcv && { hcv: hcv }),
          ...(bw && { bw: bw }),
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
        {type === "gs" && (
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
        {type === "b.p.o" && (
          <>
            <div className="input_container">
              <label htmlFor="glucose">Glucose</label>
              <input
                type="text"
                id="glucose"
                onChange={(e) => setGlucose(e.target.value)}
                value={glucose}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="uree">Uree</label>
              <input
                type="text"
                id="uree"
                onChange={(e) => setUree(e.target.value)}
                value={uree}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="creatinemie">Creatinemie</label>
              <input
                type="text"
                onChange={(e) => setCreatinemie(e.target.value)}
                id="creatinemie"
                required
                value={creatinemie}
              />
            </div>
          </>
        )}
        {(type === "tp" || type === "b.p.o") && (
          <>
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
        {(type === "hiv" || type === "b.p.o") && (
          <>
            <div className="input_container">
              <label htmlFor="hiv">HIV</label>
              <input
                type="text"
                id="hiv"
                required
                onChange={(e) => setHiv(e.target.value)}
                value={hiv}
              />
            </div>
            <div className="input_container">
              <label htmlFor="hbs">HBS</label>
              <input
                type="text"
                id="hbs"
                onChange={(e) => setHbs(e.target.value)}
                value={hbs}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="hcv">HCV</label>
              <input
                type="text"
                onChange={(e) => setHcv(e.target.value)}
                value={hcv}
                id="hcv"
                required
              />
            </div>
          </>
        )}
        {type === "hiv" && (
          <div className="input_container">
            <label htmlFor="bw">BW</label>
            <input
              type="bw"
              id="bw"
              required
              onChange={(e) => setBw(e.target.value)}
              value={bw}
            />
          </div>
        )}
      </div>

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

export default FormulaireBpo;
