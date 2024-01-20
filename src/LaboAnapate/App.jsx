import React from "react";
import { Routes, Route } from "react-router-dom";
import "../style/medecinStyle/app.css";
import Analyse from "./page/Analyse";
import Profil from "./page/Profil";
import Header from "../LaboAnapate/components/header/Header";
const App = () => {
  return (
    <div className="medecinApp">
      <Header />
      <Routes>
        <Route path="/" element={<Analyse />} />
        <Route path="/profil" element={<Profil />} />{" "}
      </Routes>
    </div>
  );
};

export default App;
