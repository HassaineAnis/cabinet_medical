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

const App = () => {
  return (
    <div className="medecinApp">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/ajouter" element={<AjouterPatient />} />
          <Route path="/modifier/:id" element={<ModifierPatient />} />
          <Route path="/analyse/:id" element={<AnalyseM />} />
          <Route path="/B.P.O/:id" element={<TableBpo />} />
          <Route
            path="/B.P.O/ajouter/tp/:id"
            element={<AjouterAnalyse typeDocument="tp" />}
          />
          <Route
            path="/B.P.O/ajouter/gs/:id"
            element={<AjouterAnalyse typeDocument="gs" />}
          />
          <Route
            path="/B.P.O/ajouter/hiv/:id"
            element={<AjouterAnalyse typeDocument="hiv" />}
          />
          <Route
            path="/B.P.O/ajouter/bpo/:id"
            element={<AjouterAnalyse typeDocument="b.p.o" />}
          />
        </Route>
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
};

export default App;
