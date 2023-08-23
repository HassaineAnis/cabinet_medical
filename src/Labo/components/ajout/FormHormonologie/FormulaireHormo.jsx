import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BpoContext } from "../../../../util/context/Context";
import { format } from "date-fns";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";

const FormulaireHormo = ({ imprimer, type, id }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);
  const {
    service,
    setService,
    date,
    setDate,
    inograme,
    setInorgame,
    vitamineD,
    setVitamineD,
    psat,
    setPsat,
    na,
    k,
    setK,
    setNa,
    rubeole,
    setRubeole,
    calcuim,
    setCalcuim,
    prolactine,
    setProlactine,
    oestradiol,
    setOestradiol,
    ferritine,
    setFerritine,
    ferSerrique,
    setFerSerrique,
    seuilSensibilite,
    setSeuilSensibilite,
    hcg,
    setHcg,
    ft3,
    setFt3,
    ft4,
    setFt4,
    tsh,
    setTsh,
  } = useContext(BpoContext);
  useEffect(() => {
    return () => {
      setDate(format(new Date(), "yyyy-MM-dd"));
      setFt3("");
      setFt4("");
      setTsh("");
      setFerSerrique("");
      setFerritine("");
      setHcg("");
      setSeuilSensibilite("");
      setOestradiol("");
      setProlactine("");
      setCalcuim("");
      setRubeole("");
      setNa("");
      setK("");
      setPsat("");
      setVitamineD("");
      setInorgame("");
    };
  }, []);
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
      typeAnalyse: "hormonologie",
      patient: id,
      document: {
        nom: type,
        data: {
          ...(k && { k: k }),
          ...(inograme && { inograme: inograme }),
          ...(vitamineD && { vitamineD: vitamineD }),
          ...(psat && { psat: psat }),
          ...(rubeole && { rubeole: rubeole }),
          ...(prolactine && { prolactine: prolactine }),
          ...(oestradiol && { oestradiol: oestradiol }),
          ...(ferritine && { ferritine: ferritine }),
          ...(ferSerrique && { ferSerrique: ferSerrique }),
          ...(na && { na: na }),
          ...(ft3 && { ft3: ft3 }),
          ...(ft4 && { ft4: ft4 }),
          ...(tsh && { tsh: tsh }),
          ...(calcuim && { calcuim: calcuim }),
          ...(hcg && { hcg: hcg }),
          ...(seuilSensibilite && { seuilSensibilite: seuilSensibilite }),
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
        {type === "ferritine" && (
          <>
            <div className="input_container">
              <label htmlFor="ferritine">Ferritine</label>
              <input
                type="text"
                id="ferritine"
                onChange={(e) => setFerritine(e.target.value)}
                value={ferritine}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="fer">Fer Serrique</label>
              <input
                type="text"
                id="fer"
                onChange={(e) => setFerSerrique(e.target.value)}
                value={ferSerrique}
                required
              />
            </div>
          </>
        )}
        {type === "hcg" && (
          <>
            <div className="input_container">
              <label htmlFor="seuil">Seuille de sensibilité</label>

              <input
                type="text"
                id="seuil"
                onChange={(e) => setSeuilSensibilite(e.target.value)}
                value={seuilSensibilite}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="hcg">HCG</label>
              <select
                id="hcg"
                onChange={(e) => setHcg(e.target.value)}
                value={hcg}
                required
              >
                <option value="">---Choix HCG---</option>
                <option value="Positif">Positif</option>
                <option value="Negatif">Negatif</option>
              </select>
            </div>
          </>
        )}
        {type === "prolE2" && (
          <>
            <div className="input_container">
              <label htmlFor="prolactine">Dosage de la prolactine</label>
              <input
                type="text"
                id=" prolactine"
                onChange={(e) => setProlactine(e.target.value)}
                value={prolactine}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="oestradiole">Dosage de l'oestradiole</label>
              <input
                type="text"
                id="oestradiole"
                onChange={(e) => setOestradiol(e.target.value)}
                value={oestradiol}
                required
              />
            </div>
          </>
        )}
        {type === "psa.t" && (
          <>
            <div className="input_container">
              <label htmlFor="psat">Dosage de la PSA.T</label>
              <input
                type="text"
                id="psat"
                onChange={(e) => setPsat(e.target.value)}
                value={psat}
              />
            </div>
            <div className="input_container">
              <label htmlFor="ionograme">Ionogramme Sanguin</label>
              <input
                type="text"
                id="ionograme"
                onChange={(e) => setInorgame(e.target.value)}
                value={inograme}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="na">Na+</label>
              <input
                type="text"
                id="na"
                onChange={(e) => setNa(e.target.value)}
                value={na}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="K">K+</label>
              <input
                type="text"
                id="k"
                onChange={(e) => setK(e.target.value)}
                value={k}
                required
              />
            </div>
          </>
        )}
        {type === "rubeole" && (
          <>
            <div className="input_container">
              <label htmlFor="rubeole">Rubéole,Sérologie lgG(UI/ml)</label>
              <input
                type="text"
                id="rubeole"
                onChange={(e) => setRubeole(e.target.value)}
                value={rubeole}
                required
              />
            </div>
          </>
        )}
        {type === "vitamine d" && (
          <>
            <div className="input_container">
              <label htmlFor="vitamine">Vitamine D</label>
              <input
                type="text"
                id="vitamine"
                onChange={(e) => setVitamineD(e.target.value)}
                value={vitamineD}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="calcuim">Calcuim</label>
              <input
                type="text"
                id="calcuim"
                onChange={(e) => setCalcuim(e.target.value)}
                value={calcuim}
              />
            </div>
          </>
        )}
        {(type === "ft3" || type === "Mini vidas") && (
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
        )}
        {(type === "ft4" || type === "Mini vidas") && (
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
        )}
        {(type === "tsh" || type === "Mini vidas") && (
          <div className="input_container">
            <label htmlFor="tshus">
              Dosage de l'hormone Thyreotrope(TSH US)
            </label>
            <input
              type="text"
              id="tshus"
              onChange={(e) => setTsh(e.target.value)}
              value={tsh}
              required
            />
          </div>
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

export default FormulaireHormo;
