import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BpoContext } from "../../../../util/context/Context";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";

const FormulaireBpo = ({ id, imprimer }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);
  useEffect(() => {
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
    };
  }, []);
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
  } = useContext(BpoContext);
  const verifierData = (e) => {
    e.preventDefault();

    openModal();
  };
  const envoyerData = async () => {
    closeModal();
    const data = {
      laborantin: jeton.id,
      date: date,
      service: service,
      typeAnalyse: "B.P.O",
      patient: id,
      document: {
        nom: "b.p.o",
        data: {
          temps: tempProth,
          taux: taux,
          inr: inr,
          tck: tck,
          glucose: glucose,
          uree: uree,
          creatinemie: creatinemie,
          hiv: hiv,
          hbs: hbs,
          hcv: hcv,
        },
      },
    };
    try {
      const response = await fetch("http://localhost:3000/api/analyse", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        notification.reussite("document ajouter avec succés.");
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'ajout du document.");
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
