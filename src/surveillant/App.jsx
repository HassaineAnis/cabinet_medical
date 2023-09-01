import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Stock from "./page/Stock";
import Navette from "./page/Navette";
import AjouterNavette from "./components/ajout/AjouterNavette";
import ModifierNavette from "./components/modifer/ModifierNavette";
import {
  NavetteProvider,
  SurveillanceProvider,
  SurveilleBabyProvider,
} from "../util/context/Context";
import Profil from "./page/Profil";
import AjouterProduit from "./components/ajout/AjouterProduit";
import AjouterQntProduit from "./components/ajout/AjouterQntProduit";
import RetrirerQntProduit from "./components/ajout/RetrirerQntProduit";
import TableQnt from "./components/table/TableQnt";
import ModifierProduit from "./components/modifer/ModifierProduit";
import Surveillance from "./page/Surveillance";
import AjouterSurveillance from "./components/ajout/AjouterSurveillance";
import ModifierSurveillance from "./components/modifer/ModifierSurveillance";
import Baby from "./page/Baby";
import AjouterBaby from "./components/ajout/AjouterBaby";
import ModifierBaby from "./components/modifer/ModifierBaby";
const App = () => {
  return (
    <div className="medecinApp">
      <Header />
      <NavetteProvider>
        <SurveillanceProvider>
          <SurveilleBabyProvider>
            <Routes>
              <Route path="/" element={<Stock />}>
                <Route path="/produit/ajouter" element={<AjouterProduit />} />
                <Route
                  path="/produit/modifier/:id"
                  element={<ModifierProduit />}
                />
                <Route path="/produit/details/:id" element={<TableQnt />} />
                <Route
                  path="/produit/quantite/ajouter/:id"
                  element={<AjouterQntProduit />}
                />{" "}
                <Route
                  path="/produit/quantite/retirer/:id"
                  element={<RetrirerQntProduit />}
                />
              </Route>

              <Route path="/navette" element={<Navette />}>
                <Route path="/navette/ajouter" element={<AjouterNavette />} />
                <Route
                  path="/navette/modifier/:id"
                  element={<ModifierNavette />}
                />
              </Route>

              <Route path="/surveillance" element={<Surveillance />}>
                <Route
                  path="/surveillance/ajouter"
                  element={<AjouterSurveillance />}
                />
                <Route
                  path="/surveillance/modifier/:id"
                  element={<ModifierSurveillance />}
                />
              </Route>
              <Route path="/Baby" element={<Baby />}>
                <Route path="/Baby/ajouter" element={<AjouterBaby />} />
                <Route path="/Baby/modifier/:id" element={<ModifierBaby />} />
              </Route>
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </SurveilleBabyProvider>
        </SurveillanceProvider>
      </NavetteProvider>
    </div>
  );
};

export default App;
