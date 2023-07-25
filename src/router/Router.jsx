import React  from "react";
import { Route, Routes } from "react-router-dom";
import MedecinApp from "../medecin/App";
import AdminApp from "../admin/App";
import Login from "../auto/Login";
import PrivateRoute from "./PrivateRoute";
import PrivateMedecin from "./PrivateMedecin";
import { AuthoProvider } from "../util/context/Context";
import RoutePrive from "./RoutePrive";
import Ordonnance from "../medecin/components/documentMedical/Ordonnance";
 
function Router() {
   
   
 
  
  return (
    
     <AuthoProvider> 
    <Routes>
      <Route path="/ordonnance/:id" element={<Ordonnance/>} />

      
      <Route element={<PrivateRoute />}>
      
      <Route path="/admin/*" element={<AdminApp />}/>
       </Route>
       
       <Route element={<PrivateMedecin />}>

      <Route path="/medecin/*" element={<MedecinApp />} />
    
       </Route>
  
   {/*
  <RoutePrive>
  <Route path="/medecin/*" element={<MedecinApp />} />
  </RoutePrive>

       
       <Route path="/admin/*" element={<AdminApp />}/>
        */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
    </AuthoProvider>
   
     
  );
}

export default Router;
