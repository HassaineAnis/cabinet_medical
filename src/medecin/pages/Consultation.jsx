import React, { useEffect, useRef, useState } from "react";
import "../../style/medecinStyle/consult.css";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "../../util/hooks/UseModal";
import { useReactToPrint } from "react-to-print";
import Modal from "react-modal";
import Ordonnance from "../components/viewDoc/Ordonnance";
import ArretTravail from "../components/viewDoc/ArretTravail";
import Circoncision from "../components/viewDoc/Circoncision";
import DebutGross from "../components/viewDoc/DebutGross";

const Consultation = () => {
  const { id } = useParams();
  const { modalIsOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const [isLoading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState([]);
  const [erreur, setErreur] = useState(false);
  const componentRef = useRef(null);
  const [currentDoc, setCurrentDoc] = useState({});

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const fetchConsult = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/consultation/patient/detail/${id}`
        );

        const consult = await response.json();
        setConsultation(consult);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConsult();
  }, []);

  const choisirComposant = (titre, reference) => {
    switch (titre) {
      case "ordonnance":
        return reference ? (
          <Ordonnance
            consultation={consultation}
            document={currentDoc}
            cible={componentRef}
          />
        ) : (
          <Ordonnance consultation={consultation} document={currentDoc} />
        );
      case "arret de travail":
        return reference ? (
          <ArretTravail
            consultation={consultation}
            document={currentDoc}
            cible={componentRef}
          />
        ) : (
          <ArretTravail consultation={consultation} document={currentDoc} />
        );
      case "circoncision":
        return reference ? (
          <Circoncision
            consultation={consultation}
            document={currentDoc}
            cible={componentRef}
          />
        ) : (
          <Circoncision consultation={consultation} document={currentDoc} />
        );
      case "debut grossesse":
        return reference ? (
          <DebutGross
            consultation={consultation}
            document={currentDoc}
            cible={componentRef}
          />
        ) : (
          <DebutGross consultation={consultation} document={currentDoc} />
        );
      default:
        // Cas où le titre n'est pas reconnu, vous pouvez retourner un message d'erreur ou autre chose.
        return <div>Composant non trouvé pour le titre : {titre}</div>;
    }
  };

  console.log(currentDoc);
  const imprimerDoc = async (doc) => {
    await setCurrentDoc(doc);
    handlePrint();
  };

  if (erreur) {
    return <div>Erreur de chargement...</div>;
  }

  return (
    <div className="details_container">
      {isLoading ? (
        <div style={{ alignSelf: "center" }} className="spinner"></div>
      ) : (
        <>
          <div
            className="doc_print"
            style={{ position: "absolute", top: "-1000%", opacity: "0" }}
          >
            {/* < Ordonnance  consultation={consultation} cible={componentRef}/>*/}
            {currentDoc && choisirComposant(currentDoc.titre, true)}
          </div>

          <div className="entete">
            <div>
              <strong>Patient : </strong>
              {consultation.patient && consultation.patient.nom}{" "}
              {consultation.patient && consultation.patient.prenom}{" "}
            </div>
            <div>
              <strong>Date :</strong>{" "}
              {new Date(consultation.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Montant :</strong>{" "}
              {parseInt(consultation.montant).toLocaleString("fr-DZ", {
                style: "currency",
                currency: "DZD",
              })}{" "}
            </div>
          </div>
          <div className="section">
            <div className="information">
              <div className="info">
                <h3>Informations</h3>
                <ul>
                  <li>
                    {" "}
                    <p>
                      <strong>Tension Artérielle : </strong>
                      {consultation.informationsMedical &&
                        consultation.informationsMedical.tension}
                    </p>{" "}
                  </li>
                  <li>
                    <p>
                      <strong>Poids : </strong>{" "}
                      {consultation.informationsMedical &&
                        consultation.informationsMedical.poid}{" "}
                      KG
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Glycémie : </strong>
                      {consultation.informationsMedical &&
                        consultation.informationsMedical.glycemie}{" "}
                      G/L
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Respiration : </strong>
                      {consultation.informationsMedical &&
                        consultation.informationsMedical.respiration}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="symptome">
                <h3>Symptome</h3>
                <ul>
                  {consultation.symptome &&
                    consultation.symptome.map((sympt, index) => (
                      <li key={`${index}-${sympt}`}> {sympt}</li>
                    ))}
                </ul>
              </div>
              <div className="diagnostic">
                <h3>Diagnostic</h3>
                <ul>
                  <li>
                    {" "}
                    <p>{consultation.diagnostic}</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="documents">
              <h3>Document médicaux</h3>
              {consultation.documentMedical &&
                consultation.documentMedical.map((doc, index) => (
                  <div className="doc" key={`${doc.titre}-${index}`}>
                    <span>
                      <strong>{doc.titre}</strong>
                    </span>
                    <div className="doc_btn">
                      <button
                        onClick={(e) => {
                          setCurrentDoc(doc);
                          openModal();
                        }}
                      >
                        Voir
                      </button>
                      <button
                        onClick={(e) => {
                          imprimerDoc(doc);
                        }}
                      >
                        Imprimer
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <button onClick={navigation}>Retour</button>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: "99" },
        }}
      >
        {/** < Ordonnance  consultation={consultation}  />*/}
        {currentDoc && choisirComposant(currentDoc.titre, false)}
      </Modal>
    </div>
  );
};

export default Consultation;
