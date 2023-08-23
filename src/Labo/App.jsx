import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import "../style/medecinStyle/app.css";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import AjouterPatient from "../medecin/components/ajout/AjouterPatient";
import ModifierPatient from "../medecin/components/modifie/ModifierPatient";
import AnalyseM from "./pages/AnalyseM";
import TableBpo from "./components/table/TableBpo";
import AjouterAnalyse from "./components/ajout/AjouterAnalyse";
import { BpoProvider } from "../util/context/Context";
import TableBiochimie from "./components/table/TableBiochimie";
import TableHematologie from "./components/table/TableHematologie";
import TableSerologie from "./components/table/TableSerologie";
import TableHormonologie from "./components/table/TableHormonologie";
import ModifierAnalyse from "./components/modifier/ModifierAnalyse";

const App = () => {
  return (
    <div className="medecinApp">
      <BpoProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/ajouter" element={<AjouterPatient />} />
            <Route path="/modifier/:id" element={<ModifierPatient />} />
            <Route path="/analyse/:id" element={<AnalyseM />} />
            {/**analyse B.P.O */}
            <Route path="/B.P.O/:id" element={<TableBpo />} />
            <Route
              path="/B.P.O/ajouter/tp/:id"
              element={<AjouterAnalyse typeDocument="tp" />}
            />
            <Route
              path="/B.P.O/modifier/tp/:id"
              element={<ModifierAnalyse typeDocument="tp" />}
            />
            <Route
              path="/B.P.O/ajouter/gs/:id"
              element={<AjouterAnalyse typeDocument="gs" />}
            />
            <Route
              path="/B.P.O/modifier/gs/:id"
              element={<ModifierAnalyse typeDocument="gs" />}
            />
            <Route
              path="/B.P.O/ajouter/hiv/:id"
              element={<AjouterAnalyse typeDocument="hiv" />}
            />
            <Route
              path="/B.P.O/modifier/hiv/:id"
              element={<ModifierAnalyse typeDocument="hiv" />}
            />
            <Route
              path="/B.P.O/ajouter/b.p.o/:id"
              element={<AjouterAnalyse typeDocument="b.p.o" />}
            />
            <Route
              path="/B.P.O/modifier/b.p.o/:id"
              element={<ModifierAnalyse typeDocument="b.p.o" />}
            />
            {/**  biochimie */}
            <Route path="/biochimie/:id" element={<TableBiochimie />} />
            <Route
              path="/biochimie/ajouter/hgpo/:id"
              element={<AjouterAnalyse typeDocument="hgpo" />}
            />
            <Route
              path="/biochimie/modifier/hgpo/:id"
              element={<ModifierAnalyse typeDocument="hgpo" />}
            />
            <Route
              path="/biochimie/ajouter/fer serrique/:id"
              element={<AjouterAnalyse typeDocument="fer serrique" />}
            />
            <Route
              path="/biochimie/modifier/fer serrique/:id"
              element={<ModifierAnalyse typeDocument="fer serrique" />}
            />
            <Route
              path="/biochimie/ajouter/crp/:id"
              element={<AjouterAnalyse typeDocument="crp" />}
            />
            <Route
              path="/biochimie/modifier/crp/:id"
              element={<ModifierAnalyse typeDocument="crp" />}
            />
            <Route
              path="/biochimie/ajouter/proteinurie/:id"
              element={<AjouterAnalyse typeDocument="proteinurie" />}
            />
            <Route
              path="/biochimie/modifier/proteinurie/:id"
              element={<ModifierAnalyse typeDocument="proteinurie" />}
            />
            <Route
              path="/biochimie/ajouter/bilirubine/:id"
              element={<AjouterAnalyse typeDocument="bilirubine" />}
            />
            <Route
              path="/biochimie/modifier/bilirubine/:id"
              element={<ModifierAnalyse typeDocument="bilirubine" />}
            />
            <Route
              path="/biochimie/ajouter/calcuim/:id"
              element={<AjouterAnalyse typeDocument="calcuim" />}
            />
            <Route
              path="/biochimie/modifier/calcuim/:id"
              element={<ModifierAnalyse typeDocument="calcuim" />}
            />
            {/* Hématologie*/}
            <Route path="/Hématologie/:id" element={<TableHematologie />} />
            <Route
              path="/Hématologie/ajouter/fibrinogene/:id"
              element={<AjouterAnalyse typeDocument="fibrinogene" />}
            />
            <Route
              path="/Hématologie/modifier/fibrinogene/:id"
              element={<ModifierAnalyse typeDocument="fibrinogene" />}
            />
            <Route
              path="/Hématologie/ajouter/tp-tck/:id"
              element={<AjouterAnalyse typeDocument="tp-tck" />}
            />
            <Route
              path="/Hématologie/modifier/tp-tck/:id"
              element={<ModifierAnalyse typeDocument="tp-tck" />}
            />
            <Route
              path="/Hématologie/ajouter/gs/:id"
              element={<AjouterAnalyse typeDocument="Gs" />}
            />
            <Route
              path="/Hématologie/modifier/gs/:id"
              element={<ModifierAnalyse typeDocument="Gs" />}
            />
            <Route
              path="/Hématologie/ajouter/vitesse/:id"
              element={<AjouterAnalyse typeDocument="vitesse" />}
            />
            <Route
              path="/Hématologie/modifier/vitesse/:id"
              element={<ModifierAnalyse typeDocument="vitesse" />}
            />
            {/* Sérologie*/}
            <Route path="/Sérologie/:id" element={<TableSerologie />} />
            <Route
              path="/Sérologie/ajouter/toxo g/:id"
              element={<AjouterAnalyse typeDocument="toxo g" />}
            />
            <Route
              path="/Sérologie/modifier/toxo g/:id"
              element={<ModifierAnalyse typeDocument="toxo g" />}
            />
            <Route
              path="/Sérologie/ajouter/mini vidas/:id"
              element={<AjouterAnalyse typeDocument="mini vidas" />}
            />
            <Route
              path="/Sérologie/modifier/mini vidas/:id"
              element={<ModifierAnalyse typeDocument="mini vidas" />}
            />
            <Route
              path="/Sérologie/ajouter/hiv/:id"
              element={<AjouterAnalyse typeDocument="Hiv" />}
            />
            <Route
              path="/Sérologie/modifier/hiv/:id"
              element={<ModifierAnalyse typeDocument="Hiv" />}
            />
            {/* Hormonologie*/}
            <Route path="/Hormonologie/:id" element={<TableHormonologie />} />
            <Route
              path="/Hormonologie/ajouter/ferritine/:id"
              element={<AjouterAnalyse typeDocument="ferritine" />}
            />
            <Route
              path="/Hormonologie/modifier/ferritine/:id"
              element={<ModifierAnalyse typeDocument="ferritine" />}
            />
            <Route
              path="/Hormonologie/ajouter/hcg/:id"
              element={<AjouterAnalyse typeDocument="hcg" />}
            />
            <Route
              path="/Hormonologie/modifier/hcg/:id"
              element={<ModifierAnalyse typeDocument="hcg" />}
            />
            <Route
              path="/Hormonologie/ajouter/prolE2/:id"
              element={<AjouterAnalyse typeDocument="prolE2" />}
            />
            <Route
              path="/Hormonologie/modifier/prolE2/:id"
              element={<ModifierAnalyse typeDocument="prolE2" />}
            />
            <Route
              path="/Hormonologie/ajouter/mini vidas/:id"
              element={<AjouterAnalyse typeDocument="Mini vidas" />}
            />
            <Route
              path="/Hormonologie/modifier/mini vidas/:id"
              element={<ModifierAnalyse typeDocument="Mini vidas" />}
            />

            <Route
              path="/Hormonologie/ajouter/rubeole/:id"
              element={<AjouterAnalyse typeDocument="rubeole" />}
            />
            <Route
              path="/Hormonologie/modifier/rubeole/:id"
              element={<ModifierAnalyse typeDocument="rubeole" />}
            />
            <Route
              path="/Hormonologie/ajouter/tsh/:id"
              element={<AjouterAnalyse typeDocument="tsh" />}
            />
            <Route
              path="/Hormonologie/modifier/tsh/:id"
              element={<ModifierAnalyse typeDocument="tsh" />}
            />
            <Route
              path="/Hormonologie/ajouter/ft4/:id"
              element={<AjouterAnalyse typeDocument="ft4" />}
            />
            <Route
              path="/Hormonologie/modifier/ft4/:id"
              element={<ModifierAnalyse typeDocument="ft4" />}
            />
            <Route
              path="/Hormonologie/ajouter/ft3/:id"
              element={<AjouterAnalyse typeDocument="ft3" />}
            />
            <Route
              path="/Hormonologie/modifier/ft3/:id"
              element={<ModifierAnalyse typeDocument="ft3" />}
            />
            <Route
              path="/Hormonologie/ajouter/vitamine d/:id"
              element={<AjouterAnalyse typeDocument="vitamine d" />}
            />
            <Route
              path="/Hormonologie/modifier/vitamine d/:id"
              element={<ModifierAnalyse typeDocument="vitamine d" />}
            />
            <Route
              path="/Hormonologie/ajouter/psa.t/:id"
              element={<AjouterAnalyse typeDocument="psa.t" />}
            />
            <Route
              path="/Hormonologie/modifier/psa.t/:id"
              element={<ModifierAnalyse typeDocument="psa.t" />}
            />
          </Route>
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </BpoProvider>
    </div>
  );
};

export default App;
