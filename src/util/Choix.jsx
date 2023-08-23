import FormulaireBpo from "../Labo/components/modifier/FormulaireBpo";
import FormulaireGs from "../Labo/components/ajout/FormBpo/FormulaireGs";
import FormulaireHematologie from "../Labo/components/ajout/FormHematologie/FormulaireHematologie";
import FormulaireHgpo from "../Labo/components/ajout/FormBiochimie/FormulaireHgpo";
import FormulaireHiv from "../Labo/components/ajout/FormBpo/FormulaireHiv";
import FormulaireTp from "../Labo/components/ajout/FormBpo/FormulaireTp";
import FormulaireSerologie from "../Labo/components/ajout/FormSerologie/FormulaireSerologie";
import FormulaireHormo from "../Labo/components/ajout/FormHormonologie/FormulaireHormo";

export const choiForm = (id, doc, typeDocument, handlePrint) => {
  if (doc === "tp" || doc === "gs" || doc === "hiv" || doc === "b.p.o") {
    return <FormulaireBpo imprimer={handlePrint} />;
  }

  if (doc === "hgpo") {
    return <FormulaireHgpo imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "fer serrique") {
    return <FormulaireHgpo imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "crp") {
    return <FormulaireHgpo imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "proteinurie") {
    return (
      <FormulaireHgpo id={id} imprimer={handlePrint} type={typeDocument} />
    );
  }
  if (doc === "bilirubine") {
    return <FormulaireHgpo imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "calcuim") {
    return <FormulaireHgpo imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "fibrinogene" || doc === "tp-tck" || doc === "vitesse") {
    return <FormulaireHematologie imprimer={handlePrint} type={typeDocument} />;
  }
  if (doc === "toxo g" || doc === "mini vidas" || doc === "Hiv") {
    return <FormulaireSerologie imprimer={handlePrint} type={typeDocument} />;
  }
  if (
    doc === "rubeole" ||
    doc === "tsh" ||
    doc === "ft4" ||
    doc === "ft3" ||
    doc === "vitamine d" ||
    doc === "psa.t"
  ) {
    return <FormulaireHormo imprimer={handlePrint} type={typeDocument} />;
  }
};
