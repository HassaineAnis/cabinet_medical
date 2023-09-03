import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import RendezVous from "./page/RendezVous";
import Profil from "./page/Profil";
import ModifierRdv from "./components/modifier/ModifierRdv";
import Consultation from "./page/Consultation";
import TableArchive from "./components/table/TableArchive";

const App = () => {
  return (
    <div className="medecinApp">
      <Header />
      <Routes>
        <Route path="/" element={<RendezVous />}>
          <Route path="/modifier/:id" element={<ModifierRdv />} />
          <Route path="/archives" element={<TableArchive />} />
        </Route>
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </div>
  );
};

export default App;
