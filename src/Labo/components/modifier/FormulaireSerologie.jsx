import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BpoContext } from "../../../util/context/Context";
import { format } from "date-fns";
import notification from "../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
const FormulaireSerologie = ({ type, imprimer }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  console.log("type doc..", type);
  const { id } = useParams();
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
    ft3,
    tsh,
    setTsh,
    ft4,
    setFt3,
    setFt4,
    toxoplasmose,
    setToxoplasmose,
  } = useContext(BpoContext);
  const [data, setData] = useState({});

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
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
        setFt3(analyse.document.data.ft3);
        setFt4(analyse.document.data.ft4);
        setTsh(analyse.document.data.tsh);
        setHbs(analyse.document.data.hbs);
        setHcv(analyse.document.data.hcv);
        setBw(analyse.document.data.bw);
        setHiv(analyse.document.data.hiv);
        setToxoplasmose(analyse.document.data.toxoplasmose);
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
      setFt3("");
      setFt4("");
      setTsh("");
      setToxoplasmose("");
      setHbs("");
      setHcv("");
      setBw("");
      setHiv("");
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
      typeAnalyse: "serologie",
      patient: data.patient && data.patient._id,
      document: {
        nom: type,
        data: {
          ...(tsh && { tsh: tsh }),
          ...(ft3 && { ft3: ft3 }),
          ...(ft4 && { ft4: ft4 }),
          ...(toxoplasmose && { toxoplasmose: toxoplasmose }),
          ...(hiv && { hiv: hiv }),
          ...(hcv && { hcv: hcv }),
          ...(hbs && { hbs: hbs }),
          ...(bw && { bw: bw }),
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

  if (erreur) {
    return <h3>Erreur de chargement des données...</h3>;
  }
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
        {type === "toxo g" && (
          <>
            <div className="input_container">
              <label htmlFor="toxo1">Toxoplasmose,Sérologie lgG(UI/ml)</label>
              <input
                type="text"
                id="toxo1"
                onChange={(e) => setToxoplasmose(e.target.value)}
                value={toxoplasmose}
                required
              />
            </div>
          </>
        )}
        {type === "mini vidas" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="ft3">
                Dosage de l'Hormone Thyroxine Libre(F-T3)
              </label>
              <input
                type="text"
                id="ft3"
                onChange={(e) => setFt3(e.target.value)}
                value={ft3}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="ft4">
                Dosage de l'Hormone Thyroxine Libre(F-T4)
              </label>
              <input
                type="text"
                id="ft4"
                onChange={(e) => setFt4(e.target.value)}
                value={ft4}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="tshus">Dosage de l'hormone Thyreotrope</label>
              <input
                type="text"
                id="tshus"
                onChange={(e) => setTsh(e.target.value)}
                value={tsh}
                required
              />
            </div>
          </>
        )}
        {type === "Hiv" && (
          <>
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

export default FormulaireSerologie;
