import React from "react";
import { Route, Routes } from "react-router-dom";
import MedecinApp from "../medecin/App";
import AdminApp from "../admin/App";
import Login from "../auto/Login";
import PrivateRoute from "./PrivateRoute";
import PrivateMedecin from "./PrivateMedecin";
import {
  AuthoProvider,
  DocumentProvider,
  ConsultationProvider,
} from "../util/context/Context";
//import RoutePrive from "./RoutePrive";
import Ordonnance from "../medecin/components/documentMedical/Ordonnance";
import ArretTravaille from "../medecin/components/documentMedical/ArretTravaille";
import PrivateLaboAM from "./PrivateLaboAM";

import LaboAmApp from "../Labo/App";
import PrivateSurveillant from "./PrivateSurveillant";
import SurveillantApp from "../surveillant/App";
import PrivateReceptionniste from "./PrivateReceptionniste";
import ReceptionnisteApp from "../receptionniste/App";
import Circoncision from "../medecin/components/documentMedical/Circoncision";
import DebutGross from "../medecin/components/documentMedical/DebutGross";

function Router() {
  return (
    <AuthoProvider>
      <DocumentProvider>
        <ConsultationProvider>
          <Routes>
            <Route path="/ordonnance/:id" element={<Ordonnance />} />
            <Route path="/arret_travaille/:id" element={<ArretTravaille />} />
            <Route path="/circoncision/:id" element={<Circoncision />} />
            <Route path="/debutGrossesse/:id" element={<DebutGross />} />

            {/** Protection de l'ecpace Admin */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin/*" element={<AdminApp />} />
            </Route>
            {/** Protection de l'ecpace Medecin */}
            <Route element={<PrivateMedecin />}>
              <Route path="/medecin/*" element={<MedecinApp />} />
            </Route>
            {/** Protection de l'ecpace LaboAM */}
            <Route element={<PrivateLaboAM />}>
              <Route path="/laboAM/*" element={<LaboAmApp />} />
            </Route>
            {/** Protection de l'espace Surveillant*/}
            <Route element={<PrivateSurveillant />}>
              <Route path="/surveillant/*" element={<SurveillantApp />} />
            </Route>
            {/** Protection de l'espace Réceptionniste*/}
            <Route element={<PrivateReceptionniste />}>
              <Route path="/receptionniste/*" element={<ReceptionnisteApp />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </ConsultationProvider>
      </DocumentProvider>
    </AuthoProvider>
  );
}

export default Router;
