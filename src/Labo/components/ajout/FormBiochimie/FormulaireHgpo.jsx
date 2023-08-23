import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BpoContext } from "../../../../util/context/Context";
import { format } from "date-fns";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";

const FormulaireHgpo = ({ id, imprimer, type }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);
  useEffect(() => {
    setDate(format(new Date(), "yyyy-MM-dd"));
    setDosage1("");
    setDosage2("");
    setDosage3("");
    setPhosphore("");
    setProteinurie("");
    setFerSerrique("");
    setBilirubineSangD("");
    setBilirubineSangT("");
    setBilirubineUrineD("");
    setBilirubineUrineT("");
    setCoombs("");
    setCalcuim("");
    setMagnesium("");
    setRai("");
    setCrp("");
    setDiurese("");
  }, []);
  const {
    date,
    setDate,
    service,
    setService,
    dosage3,
    setDosage3,
    dosage1,
    setDosage1,
    dosage2,
    setDosage2,
    proteinurie,
    setProteinurie,
    ferSerrique,
    setFerSerrique,
    coombs,
    setCoombs,
    bilirubineSangT,
    setBilirubineSangT,
    bilirubineSangD,
    setBilirubineSangD,
    phosphore,
    setPhosphore,
    calcuim,
    setCalcuim,
    crp,
    setCrp,
    rai,
    setRai,
    magnesium,
    setMagnesium,
    diurese,
    setDiurese,
    bilirubineUrineD,
    setBilirubineUrineD,
    bilirubineUrineT,
    setBilirubineUrineT,
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
      typeAnalyse: "biochimie",
      patient: id,
      document: {
        nom: type,
        data: {
          ...(dosage3 && { dosage3: dosage3 }),
          ...(dosage1 && { dosage1: dosage1 }),
          ...(dosage2 && { dosage2: dosage2 }),
          ...(proteinurie && { proteinurie: proteinurie }),
          ...(ferSerrique && { ferSerrique: ferSerrique }),
          ...(coombs && { coombs: coombs }),
          ...(bilirubineSangT && { bilirubineSangT: bilirubineSangT }),
          ...(bilirubineSangD && { bilirubineSangD: bilirubineSangD }),
          ...(phosphore && { phosphore: phosphore }),
          ...(calcuim && { calcuim: calcuim }),
          ...(crp && { crp: crp }),
          ...(rai && { rai: rai }),
          ...(magnesium && { magnesium: magnesium }),
          ...(diurese && { diurese: diurese }),
          ...(bilirubineUrineD && { bilirubineUrineD: bilirubineUrineD }),
          ...(bilirubineUrineT && { bilirubineUrineT: bilirubineUrineT }),
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

        {(type === "fer serrique" || type === "calcuim") && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="ferSer">Fer Sérrique</label>
              <input
                type="text"
                id="ferSer"
                onChange={(e) => setFerSerrique(e.target.value)}
                value={ferSerrique}
              />
            </div>
          </>
        )}
        {(type === "crp" || type === "bilirubine") && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="crp">CRP</label>
              <input
                type="text"
                id="crp"
                onChange={(e) => setCrp(e.target.value)}
                value={crp}
              />
            </div>
          </>
        )}
        {type === "proteinurie" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="proteinurie">Proteinurie</label>
              <input
                type="text"
                id="proteinurie"
                onChange={(e) => setProteinurie(e.target.value)}
                value={proteinurie}
              />
            </div>
            <div className="input_container">
              <label htmlFor="diurese">Diurese</label>
              <input
                type="text"
                id="diurese"
                onChange={(e) => setDiurese(e.target.value)}
                value={diurese}
              />
            </div>
          </>
        )}

        {type === "bilirubine" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="sangT">Bilirubine T(sang)</label>
              <input
                type="text"
                id="sangT"
                onChange={(e) => setBilirubineSangT(e.target.value)}
                value={bilirubineSangT}
              />
            </div>
            <div className="input_container">
              <label htmlFor="sangD">Bilirubine D(sang)</label>
              <input
                type="text"
                id="sangD"
                onChange={(e) => setBilirubineSangD(e.target.value)}
                value={bilirubineSangD}
              />
            </div>
            <div className="input_container">
              <label htmlFor="urineT">Bilirubine T(urée)</label>
              <input
                type="text"
                id="urineT"
                onChange={(e) => setBilirubineUrineT(e.target.value)}
                value={bilirubineUrineT}
              />
            </div>
            <div className="input_container">
              <label htmlFor="urineD">Bilirubine D(urée)</label>
              <input
                type="text"
                id="urineD"
                onChange={(e) => setBilirubineUrineD(e.target.value)}
                value={bilirubineUrineD}
              />
            </div>
            <div className="input_container">
              <label htmlFor="calcuim">Calcium</label>
              <input
                type="text"
                id="calcuim"
                onChange={(e) => setCalcuim(e.target.value)}
                value={calcuim}
              />
            </div>
            <div className="input_container">
              <label htmlFor="test">Test de Coombs</label>
              <input
                type="text"
                id="test"
                onChange={(e) => setCoombs(e.target.value)}
                value={coombs}
              />
            </div>
            <div className="input_container">
              <label htmlFor="rai">Rai</label>
              <input
                type="text"
                id="rai"
                onChange={(e) => setRai(e.target.value)}
                value={rai}
              />
            </div>
          </>
        )}

        {type === "calcuim" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="calcuim">Calcium</label>
              <input
                type="text"
                id="calcuim"
                onChange={(e) => setCalcuim(e.target.value)}
                value={calcuim}
              />
            </div>
            <div className="input_container">
              <label htmlFor="phosphore">Phosphore</label>
              <input
                type="text"
                id="phosphore"
                onChange={(e) => setPhosphore(e.target.value)}
                value={phosphore}
              />
            </div>
            <div className="input_container">
              <label htmlFor="magnesium">Magnesium</label>
              <input
                type="text"
                id="magnesium"
                onChange={(e) => setMagnesium(e.target.value)}
                value={magnesium}
              />
            </div>
          </>
        )}

        {type === "hgpo" && (
          <>
            {" "}
            <div className="input_container">
              <label htmlFor="dosage1">Dosage1</label>
              <input
                type="text"
                id="dosage1"
                onChange={(e) => setDosage1(e.target.value)}
                value={dosage1}
              />
            </div>
            <div className="input_container">
              <label htmlFor="dosage2">Dosage2</label>
              <input
                type="text"
                id="dosage2"
                onChange={(e) => setDosage2(e.target.value)}
                value={dosage2}
              />
            </div>
            <div className="input_container">
              <label htmlFor="dosage">Dosage3</label>
              <input
                type="text"
                id="dosage3"
                onChange={(e) => setDosage3(e.target.value)}
                value={dosage3}
              />
            </div>
          </>
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

export default FormulaireHgpo;
