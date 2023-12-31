import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";

import DossierMedical from "./components/dossierMedical/DossierMedical";

import "../style/medecinStyle/app.css";

import { RechargeProvider } from "../util/context/Context";
import AjouterRDV from "./components/ajout/AjouterRDV";
import RendezVous from "./pages/RendezVous";
import ModifierRdv from "./components/modifie/ModifierRdv";
import Profil from "./pages/Profil";
import Patient from "./pages/Patient";
import TableRdvArchive from "./components/tables/TableRdvArchive";
import AjouterPatient from "./components/ajout/AjouterPatient";
import ModifierPatient from "./components/modifie/ModifierPatient";

import AjouterConsult from "./components/ajout/AjouterConsult";
import Consultation from "./pages/Consultation";
import Erreur from "../admin/pages/Erreur";
import AjouterIntervention from "./components/ajout/AjouterIntervention";
import AjouterAccouchement from "./components/ajout/AjouterAccouchement";
import ModifierIntervention from "./components/modifie/ModifierIntervention";

const App = () => {
  return (
    <div className="medecinApp">
      <Header />
      <RechargeProvider>
        <Routes>
          <Route path="/patient" element={<Patient />}>
            <Route path="/patient/ajouter" element={<AjouterPatient />} />
            <Route path="/patient/modifier/:id" element={<ModifierPatient />} />
            <Route path="/patient/dossier/:id" element={<DossierMedical />} />
            <Route
              path="/patient/dossier/rendez-vous/ajouter/:id"
              element={<AjouterRDV />}
            />
            <Route
              path="/patient/dossier/rendez-vous/archives/:id"
              element={<TableRdvArchive />}
            />

            <Route
              path="/patient/dossier/consultation/details/:id"
              element={<Consultation />}
            />

            <Route
              path="/patient/dossier/consultation/ajouter/:id"
              element={<AjouterConsult />}
            />
            <Route
              path="/patient/dossier/intervention/ajouter/:id"
              element={<AjouterIntervention />}
            />
            <Route
              path="/patient/dossier/accouchement/ajouter/:id"
              element={<AjouterAccouchement />}
            />
            <Route
              path="/patient/dossier/intervention/details/:id"
              element={<ModifierIntervention />}
            />
          </Route>

          <Route path="/*" element={<Erreur />} />
          <Route path="/profil" element={<Profil />} />

          <Route path="/" element={<RendezVous />}>
            <Route path="/rendez-vous/archives" element={<TableRdvArchive />} />
            <Route path="/rendez-vous/modifier/:id" element={<ModifierRdv />} />
          </Route>
        </Routes>
      </RechargeProvider>
    </div>
  );
};

export default App;
