import React from "react";
import { ListeAnalyse } from "../../data/laboAM/Cards";
import "../../style/laboAM/analyseM.css";
import AnalyseCard from "../components/cards/AnalyseCard";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../style/loader/loader.css";
const AnalyseM = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchRdv = async () => {
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

    fetchRdv();
  }, [id]);

  if (erreur) {
    return <div className="analyse">Erreur de chargement...</div>;
  }

  return (
    <div className="analyse">
      <h2>Analyses Médicals</h2>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="infoPatient">
            <div className="info_patient">
              <p>
                <span>Nom:</span> <span>{patient && patient.nom}</span>
              </p>
              <p>
                <span>Prénom:</span> <span>{patient && patient.prenom}</span>
              </p>
              <p>
                <span>Sexe:</span> <span>{patient && patient.sexe}</span>
              </p>
              <p>
                <span>Age:</span> <span>{patient && patient.age}</span>
              </p>
            </div>
            <button onClick={navigation}>Retour</button>
          </div>

          <div className="analyse_items">
            {ListeAnalyse.map((card, index) => (
              <AnalyseCard
                key={index}
                abr={card.Abreviation}
                titre={card.titre}
                description={card.description}
                lien={`/laboAM/${card.Abreviation}/${id}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyseM;
