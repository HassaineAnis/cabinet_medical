import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BpoContext } from "../../../../util/context/Context";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";
const FormulaireHiv = ({ id, imprimer }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  useEffect(() => {
    return () => {
      setHiv("");
      setHbs("");
      setHcv("");

      setBw("");
    };
  }, []);
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);
  const {
    bw,
    setBw,
    hiv,
    setHiv,
    hbs,
    setHbs,
    hcv,
    setHcv,
    service,
    setService,
    date,
    setDate,
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
        nom: "hiv",
        data: {
          hiv: hiv,
          hbs: hbs,
          hcv: hcv,
          bw: bw,
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
          <label htmlFor="hiv">HIV</label>
          <input
            type="hiv"
            id="hiv"
            required
            onChange={(e) => setHiv(e.target.value)}
            value={hiv}
          />
        </div>
        <div className="input_container">
          <label htmlFor="hbs">HBS</label>
          <input
            type="hbs"
            id="hbs"
            onChange={(e) => setHbs(e.target.value)}
            value={hbs}
            required
          />
        </div>
        <div className="input_container">
          <label htmlFor="hcv">HCV</label>
          <input
            type="hcv"
            onChange={(e) => setHcv(e.target.value)}
            value={hcv}
            id="hcv"
            required
          />
        </div>
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

export default FormulaireHiv;
