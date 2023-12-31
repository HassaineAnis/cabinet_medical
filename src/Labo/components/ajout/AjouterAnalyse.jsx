import React, { useRef, useState, useEffect } from "react";
import "../../../style/medecinStyle/ajout/ajouterIntervension.css";
import { useParams } from "react-router-dom";
import FormulaireTp from "./FormBpo/FormulaireTp";
import FormulaireGs from "./FormBpo/FormulaireGs";
import FormulaireHiv from "./FormBpo/FormulaireHiv";
import Tp from "../documents/BPO/Tp";
import { useReactToPrint } from "react-to-print";
import Hiv from "../documents/BPO/Hiv";
import Gs from "../documents/BPO/Gs";
import FormulaireBpo from "./FormBpo/FormulaireBpo";
import Bpo from "../documents/BPO/Bpo";
import FormulaireHgpo from "./FormBiochimie/FormulaireHgpo";
import Hgpo from "../documents/Biochimie/Hgpo";
import Fer from "../documents/Biochimie/Fer";
import Crp from "../documents/Biochimie/Crp";
import Proteinurie from "../documents/Biochimie/Proteinurie";
import Bilirubine from "../documents/Biochimie/Bilirubine";
import Caluim from "../documents/Biochimie/Caluim";
import Fibrinogene from "../documents/hematologie/fibrinogene";
import FormulaireHematologie from "./FormHematologie/FormulaireHematologie";
import VitesseS from "../documents/hematologie/VitesseS";
import FormulaireSerologie from "./FormSerologie/FormulaireSerologie";
import Toxo from "../documents/Serologie/Toxo";
import HivSerologie from "../documents/Serologie/HivSerologie";
import MiniVidas from "../documents/Serologie/MiniVidas";
import Rubeole from "../documents/hormonologie/Rubeole";
import FormulaireHormo from "./FormHormonologie/FormulaireHormo";
import Tsh from "../documents/hormonologie/Tsh";
import Ft4 from "../documents/hormonologie/Ft4";
import Ft3 from "../documents/hormonologie/Ft3";
import VitamineD from "../documents/hormonologie/VitamineD";
import Psat from "../documents/hormonologie/Psat";
import { ToastContainer } from "react-toastify";
import "../../../style/loader/loader.css";
import Ferritine from "../documents/hormonologie/Ferritine";
import ProlE2 from "../documents/hormonologie/ProlE2";
import Hcg from "../documents/hormonologie/Hcg";
const AjouterAnalyse = ({ typeDocument }) => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [patient, setPatient] = useState({});
  const [erreur, setErreur] = useState(false);

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

  const composantImprimable = useRef(null);

  const choiForm = (doc) => {
    if (doc === "tp") {
      return <FormulaireTp id={id} imprimer={handlePrint} />;
    }
    if (doc === "gs") {
      return <FormulaireGs id={id} imprimer={handlePrint} />;
    }
    if (doc === "hiv") {
      return <FormulaireHiv id={id} imprimer={handlePrint} />;
    }
    if (doc === "b.p.o") {
      return <FormulaireBpo id={id} imprimer={handlePrint} />;
    }
    if (
      doc === "hgpo" ||
      doc === "fer serrique" ||
      doc === "crp" ||
      doc === "proteinurie" ||
      doc === "bilirubine" ||
      doc === "calcuim"
    ) {
      return (
        <FormulaireHgpo id={id} imprimer={handlePrint} type={typeDocument} />
      );
    }

    if (
      doc === "fibrinogene" ||
      doc === "tp-tck" ||
      doc === "vitesse" ||
      doc === "Gs"
    ) {
      return (
        <FormulaireHematologie
          id={id}
          imprimer={handlePrint}
          type={typeDocument}
        />
      );
    }
    if (doc === "toxo g" || doc === "mini vidas" || doc === "Hiv") {
      return (
        <FormulaireSerologie
          id={id}
          imprimer={handlePrint}
          type={typeDocument}
        />
      );
    }
    if (
      doc === "rubeole" ||
      doc === "tsh" ||
      doc === "ft4" ||
      doc === "ft3" ||
      doc === "vitamine d" ||
      doc === "psa.t" ||
      doc === "ferritine" ||
      doc === "prolE2" ||
      doc === "Mini vidas" ||
      doc === "hcg"
    ) {
      return (
        <FormulaireHormo id={id} imprimer={handlePrint} type={typeDocument} />
      );
    }
  };

  const choiDoc = (doc, nom, prenom, age, adresse, sexe) => {
    if (doc === "tp" || doc === "tp-tck") {
      return (
        <Tp
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "gs" || doc === "Gs") {
      return (
        <Gs
          nom={nom}
          prenom={prenom}
          age={age}
          adresse={adresse}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "hiv") {
      return (
        <Hiv
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "b.p.o") {
      return (
        <Bpo
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }

    if (doc === "hgpo") {
      return (
        <Hgpo
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "fer serrique") {
      return (
        <Fer
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "crp") {
      return (
        <Crp
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "proteinurie") {
      return (
        <Proteinurie
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "bilirubine") {
      return (
        <Bilirubine
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "calcuim") {
      return (
        <Caluim
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "fibrinogene") {
      return (
        <Fibrinogene
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "vitesse") {
      return (
        <VitesseS
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "toxo g") {
      return (
        <Toxo
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "Hiv") {
      return (
        <HivSerologie
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "mini vidas" || doc === "Mini vidas") {
      return (
        <MiniVidas
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "rubeole") {
      return (
        <Rubeole
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "tsh") {
      return (
        <Tsh
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "ft4") {
      return (
        <Ft4
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "ft3") {
      return (
        <Ft3
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "vitamine d") {
      return (
        <VitamineD
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "psa.t") {
      return (
        <Psat
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "ferritine") {
      return (
        <Ferritine
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "prolE2") {
      return (
        <ProlE2
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
    if (doc === "hcg") {
      return (
        <Hcg
          nom={nom}
          prenom={prenom}
          age={age}
          sexe={sexe}
          reference={composantImprimable}
        />
      );
    }
  };
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });
  console.log(
    choiDoc(
      typeDocument,
      patient.nom,
      patient.prenom,
      patient.age,
      patient.adresse,
      patient.sexe
    ),
    "",
    typeDocument
  );
  return (
    <>
      <ToastContainer />

      {isLoading ? (
        <div className="spinner" style={{ alignSelf: "center" }}></div>
      ) : (
        <div className="intervention">
          <div className="section1">
            {choiDoc(
              typeDocument,
              patient.nom,
              patient.prenom,
              patient.age,
              patient.adresse,
              patient.sexe
            )}
          </div>
          <div className="formulaire">
            {" "}
            <h2 style={{ textTransform: "capitalize", margin: "0" }}>
              Analyse{" "}
              <span style={{ textTransform: "uppercase" }}>{typeDocument}</span>
            </h2>
            {choiForm(typeDocument)}
          </div>
        </div>
      )}
    </>
  );
};

export default AjouterAnalyse;
