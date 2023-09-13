import React, { useContext, useEffect, useRef } from "react";

import { NaissanceContext } from "../../../../util/context/Context";
import notification from "../../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../../util/hooks/UseModal";
import { useNavigate } from "react-router-dom";

const NaissanceForm = ({ imprimer }) => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const {
    dateEpou,
    setDateEpou,
    dateDame,
    setDateDame,
    acteN,
    setActeN,
    lanDeuxMille,
    setLanDeuxMille,
    numero,
    setNumero,
    grosseLettre,
    setGrosseLettre,
    dateMariage,
    setDateMariage,
    lfNumero,
    setLfNumero,
    du,
    setDu,
    mois,
    setMois,
    jour,
    setJour,
    heure,
    setHeure,
    minute,
    dame,
    setDame,
    setMinute,
    ageDame,
    setAgeDame,
    lieuEpou,
    setLieuEpou,
    lieuDame,
    setLieuDame,
    professionDame,
    setProfessionDame,
    epou,
    setEpou,
    ageEpou,
    setAgeEpou,
    professionEpou,
    setProfessionEpou,
    domicile,
    setDomicile,
    sexeEnfant,
    setSexeEnfant,
    prenomEnfant,
    setPrenomEnfant,
  } = useContext(NaissanceContext);
  useEffect(() => {
    return () => {
      setDateEpou("");
      setDateDame("");
      setActeN("");
      setLanDeuxMille("");
      setNumero("");
      setGrosseLettre("");
      setDateMariage("");
      setLfNumero("");
      setDu("");
      setMois("");
      setJour("");
      setHeure("");
      setMinute("");
      setDame("");
      setAgeDame("");
      setLieuEpou("");
      setLieuDame("");
      setProfessionDame("");
      setEpou("");
      setAgeEpou("");
      setProfessionEpou("");
      setDomicile("");
      setSexeEnfant("");
      setPrenomEnfant("");
    };
  }, []);

  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      numero: numero,
      grosseLettre: grosseLettre,
      dateMariage: dateMariage,
      lfNumero: lfNumero,
      du: du,
      mois: mois,
      jour: jour,
      heure: heure,
      minute: minute,
      dateDame: dateDame,
      dame: dame,
      lieuEpou: lieuEpou,
      lieuDame: lieuDame,
      dateEpou: dateEpou,
      professionDame: professionDame,
      professionEpou: professionEpou,
      domicile: domicile,
      prenomEnfant: prenomEnfant,
      sexeEnfant: sexeEnfant,
      numeroActe: acteN,
      deuxMille: lanDeuxMille,
      ageDame: ageDame,
      epou: epou,
      ageEpou: ageEpou,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/bebe/surveillance/naissance",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite("Fiche surveillance ajouter avec succés.");
        // formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de l'ajout de la fiche.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };
  return (
    <>
      <form onSubmit={verificationData}>
        <div
          className="partie1"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
          }}
        >
          <div className="input_container">
            <label htmlFor="nom">Numéro</label>
            <input
              type="text"
              id="nom"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="prenom">Ecrire en grosses lettes</label>
            <input
              type="text"
              id="prenom"
              onChange={(e) => setGrosseLettre(e.target.value)}
              value={grosseLettre}
              required
            />
          </div>{" "}
          <div className="input_container">
            <label htmlFor="nne">Marié le </label>
            <input
              type="date"
              id="nne"
              onChange={(e) => setDateMariage(e.target.value)}
              value={dateMariage}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="lf">L.F N° </label>
            <input
              name="lf"
              id="lf"
              onChange={(e) => setLfNumero(e.target.value)}
              value={lfNumero}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="du">Du</label>
            <input
              type="text"
              id="du"
              onChange={(e) => setDu(e.target.value)}
              value={du}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="acte">Acte N°</label>
            <input
              name="acte"
              id="acte"
              onChange={(e) => setActeN(e.target.value)}
              value={acteN}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="couveuse">L'an deux mille</label>
            <input
              type="text"
              id="couveuse"
              onChange={(e) => setLanDeuxMille(e.target.value)}
              value={lanDeuxMille}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="groupage">jour</label>
            <input
              type="text"
              id="groupage"
              onChange={(e) => setJour(e.target.value)}
              value={jour}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="mois">mois </label>
            <input
              type="text"
              id="mois"
              onChange={(e) => setMois(e.target.value)}
              value={mois}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="heure">heure </label>
            <input
              type="text"
              id="heure"
              onChange={(e) => setHeure(e.target.value)}
              value={heure}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="minute">Minute </label>
            <input
              type="text"
              id="minute"
              onChange={(e) => setMinute(e.target.value)}
              value={minute}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dame">Dame(nom & prenom)</label>
            <input
              type="text"
              id="dame"
              onChange={(e) => setDame(e.target.value)}
              value={dame}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dameage">Age (Dame)</label>
            <input
              type="text"
              id="dameage"
              onChange={(e) => setAgeDame(e.target.value)}
              value={ageDame}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dateDame">Date naissance(dame)</label>
            <input
              type="date"
              id="dateDame"
              onChange={(e) => setDateDame(e.target.value)}
              value={dateDame}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="lieuN">Lieu de naissance(dame)</label>
            <input
              type="text"
              id="lieuN"
              onChange={(e) => setLieuDame(e.target.value)}
              value={lieuDame}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="profession">Profession(dame)</label>
            <input
              type="text"
              id="profession"
              onChange={(e) => setProfessionDame(e.target.value)}
              value={professionDame}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="epou">Epou(nom & prenom)</label>
            <input
              type="text"
              id="epou"
              onChange={(e) => setEpou(e.target.value)}
              value={epou}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dameage">Age (Epou)</label>
            <input
              type="text"
              id="dameage"
              onChange={(e) => setAgeEpou(e.target.value)}
              value={ageEpou}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="dateDame">Date naissance(epou)</label>
            <input
              type="date"
              id="dateDame"
              onChange={(e) => setDateEpou(e.target.value)}
              value={dateEpou}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="lieuN">Lieu de naissance(epou)</label>
            <input
              type="text"
              id="lieuN"
              onChange={(e) => setLieuEpou(e.target.value)}
              value={lieuEpou}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="profession">Profession(Epou)</label>
            <input
              type="text"
              id="profession"
              onChange={(e) => setProfessionEpou(e.target.value)}
              value={professionEpou}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="domicile">Domicile</label>
            <input
              type="text"
              id="domicile"
              onChange={(e) => setDomicile(e.target.value)}
              value={domicile}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="bebe">Prenom du bébé</label>
            <input
              type="text"
              id="bebe"
              onChange={(e) => setPrenomEnfant(e.target.value)}
              value={prenomEnfant}
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="sexe">Sexe du bébe</label>
            <select
              type="text"
              id="sexe"
              onChange={(e) => setSexeEnfant(e.target.value)}
              value={sexeEnfant}
              required
            >
              <option value="">---sexe bébé---</option>
              <option value="Garçon">Garçon</option>
              <option value="Fille">Fille</option>
            </select>
          </div>
        </div>

        <div className="btn">
          <div className="btn_save">
            <button>Enregisté</button>
            <span onClick={navigation}>Annuler</span>
          </div>

          <span onClick={imprimer}>Imprimer</span>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <p> Confirmé l'enregistrement de la fiche? </p>
        <div className="repense">
          <button onClick={enregitrer}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </>
  );
};

export default NaissanceForm;
