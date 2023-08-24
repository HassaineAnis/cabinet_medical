import Crp from "../../../Labo/components/documents/Biochimie/Crp";
import Bilirubine from "../../../Labo/components/documents/Biochimie/Bilirubine";
import Fer from "../../../Labo/components/documents/Biochimie/Fer";
import Hgpo from "../../../Labo/components/documents/Biochimie/Hgpo";
import Calcuim from "../../../Labo/components/documents/Biochimie/Caluim";

import Proteinurie from "../../../Labo/components/documents/Biochimie/Proteinurie";

import Fibrinogene from "../../../Labo/components/documents/hematologie/fibrinogene";
import VitesseS from "../../../Labo/components/documents/hematologie/VitesseS";
import Tp from "../../../Labo/components/documents/BPO/Tp";
import Gs from "../../../Labo/components/documents/BPO/Gs";
import Tsh from "../../../Labo/components/documents/hormonologie/Tsh";
import Ft3 from "../../../Labo/components/documents/hormonologie/Ft3";
import Ft4 from "../../../Labo/components/documents/hormonologie/Ft4";
import Ferritine from "../../../Labo/components/documents/hormonologie/Ferritine";
import Hcg from "../../../Labo/components/documents/hormonologie/Hcg";
import MiniVidas from "../../../Labo/components/documents/Serologie/MiniVidas";
import ProlE2 from "../../../Labo/components/documents/hormonologie/ProlE2";
import Rubeole from "../../../Labo/components/documents/hormonologie/Rubeole";
import Psat from "../../../Labo/components/documents/hormonologie/Psat";
import VitamineD from "../../../Labo/components/documents/hormonologie/VitamineD";
import Hiv from "../../../Labo/components/documents/BPO/Hiv";
import Bpo from "../../../Labo/components/documents/BPO/Bpo";
import Toxo from "../../../Labo/components/documents/Serologie/Toxo";
export const choiDocument = (titre, ref, patient, data, dataDoc) => {
  switch (titre) {
    case "crp":
      return (
        <Crp
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "bilirubine":
      return (
        <Bilirubine
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "fer serrique":
      return (
        <Fer
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "hgpo":
      return (
        <Hgpo
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "calcuim":
      return (
        <Calcuim
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "proteinurie":
      return (
        <Proteinurie
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "fibrinogene":
      return (
        <Fibrinogene
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "vitesse":
      return (
        <VitesseS
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "tp-tck":
      return (
        <Tp
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "tp":
      return (
        <Tp
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          dateService={dataDoc}
        />
      );
    case "Gs":
      return (
        <Gs
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "gs":
      return (
        <Gs
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "rubeole":
      return (
        <Rubeole
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "tsh":
      return (
        <Tsh
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "vitamine d":
      return (
        <VitamineD
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "psa.t":
      return (
        <Psat
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "prolE2":
      return (
        <ProlE2
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "Mini vidas":
      return (
        <MiniVidas
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "mini vidas":
      return (
        <MiniVidas
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "hcg":
      return (
        <Hcg
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "ft4":
      return (
        <Ft4
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "ft3":
      return (
        <Ft3
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "ferritine":
      return (
        <Ferritine
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "hiv":
      return (
        <Hiv
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "Hiv":
      return (
        <Hiv
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "b.p.o":
      return (
        <Bpo
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    case "toxo g":
      return (
        <Toxo
          reference={ref}
          nom={patient.nom}
          prenom={patient.prenom}
          age={patient.age}
          sexe={patient.sexe}
          data={data}
          adresse={patient.adresse}
          dateService={dataDoc}
        />
      );
    default:
      return <div>composant introuvable</div>;
  }
};
