import Navbar from "./components/navigation/Navbar";
import Header from "./components/header/Header";
import Acceuil from "./pages/Acceuil";
import "../style/adminStyle/app.css";
import { Route, Routes } from "react-router-dom";
import Profile from "../admin/pages/Profile";

import Conge from "../admin/pages/Conge";
import Magasin from "../admin/pages/Magasin";
import Convention from "../admin/pages/Convention";

import Medecins from "./pages/Medecin";
import UsersRestant from "./pages/UsersRestant";

import Erreur from "./pages/Erreur";
import { specialiteMedecin, specialitePersonnel } from "../data/ListMedecin";

import Utilisateur from "./pages/Utilisateur";
import AjouterUser from "./components/ajout/AjouterUser";
import AjouterAutreUsers from "./components/ajout/AjouterAutreUsers";
import ProfilUsers from "./components/profil/ProfilUsers";
import ProfilMedecin from "./components/profil/ProfilMedecin";
import Employe from "./pages/Employe";
import AjouterEmploye from "./components/ajout/AjouterEmploye";
import ProfilEmploye from "./components/profil/ProfilEmploye";
import AjouterConge from "./components/ajout/AjouterConge";
import ModifierConge from "./components/modifie/ModifierConge";
import TableArchive from "./components/tables/TableArchive";
import AjouterProduit from "./components/ajout/AjouterProduit";
import ModifierProduit from "./components/modifie/ModifierProduit";
import AjouterConvention from "./components/ajout/AjouterConvention";
import AjouterPresta from "./components/ajout/AjouterPresta";
import TablePresta from "./components/tables/TablePresta";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Header />

      <Routes>
        <Route path="/" element={<Profile />} />

        <Route path="/utilisateurs" element={<Utilisateur />}></Route>
        <Route path="/utilisateurs/medecin" element={<Medecins />}>
          <Route
            path="/utilisateurs/medecin/ajouter"
            element={<AjouterUser specialite={specialiteMedecin} />}
          />
          <Route
            path="/utilisateurs/medecin/profile/:id"
            element={<ProfilMedecin specialite={specialiteMedecin} />}
          />
        </Route>

        <Route
          path="/utilisateurs/receptionniste"
          element={
            <UsersRestant
              role="Réceptionniste"
              route={"/admin/utilisateurs/receptionniste"}
              nomBtn="Ajouter Un Réceptionniste"
              titre="Liste Des Récecionnistes"
            />
          }
        >
          <Route
            path="/utilisateurs/receptionniste/ajouter"
            element={
              <AjouterAutreUsers
                titre="Informations Du Réceptionniste"
                role="Réceptionniste"
              />
            }
          />
          <Route
            path="/utilisateurs/receptionniste/profile/:id"
            element={<ProfilUsers />}
          />
        </Route>

        <Route
          path="/utilisateurs/pharmacien"
          element={
            <UsersRestant
              role="Surveillant"
              route={"/admin/utilisateurs/pharmacien"}
              nomBtn="Ajouter Un Pharmacien"
              titre="Liste Des Pharmaciens"
            />
          }
        >
          <Route
            path="/utilisateurs/pharmacien/ajouter"
            element={
              <AjouterAutreUsers
                titre="Informations Du Pharmacien"
                role="Surveillant"
              />
            }
          />
        </Route>

        <Route
          path="/utilisateurs/laborantinAM"
          element={
            <UsersRestant
              role="LaborantinAM"
              route={"/admin/utilisateurs/laborantinAM"}
              nomBtn="Ajouter Un LaborantinAM"
              titre="Liste Des LaborantinAM"
            />
          }
        >
          <Route
            path="/utilisateurs/laborantinAM/ajouter"
            element={
              <AjouterAutreUsers
                titre="Informations Du LAborantin"
                role="LaborantinAM"
              />
            }
          />
        </Route>

        <Route
          path="/utilisateurs/laborantinACP"
          element={
            <UsersRestant
              role="laborantinACP"
              route={"/admin/utilisateurs/laborantinACP"}
              nomBtn="Ajouter Un LaborantinACP"
              titre="Liste Des LaborantinACP"
            />
          }
        >
          <Route
            path="/utilisateurs/laborantinACP/ajouter"
            element={
              <AjouterAutreUsers
                titre="Informations Du LAborantin"
                role="LaborantinACP"
              />
            }
          />
        </Route>

        <Route path="/personnel" element={<Employe />}>
          <Route
            path="/personnel/ajouter"
            element={<AjouterEmploye specialite={specialitePersonnel} />}
          />
          <Route
            path="/personnel/profile/:id"
            element={<ProfilEmploye specialite={specialitePersonnel} />}
          />
        </Route>

        <Route path="/conge" element={<Conge />}>
          <Route path="/conge/ajouter" element={<AjouterConge />} />
          <Route path="/conge/modifie/:id" element={<ModifierConge />} />
          <Route path="/conge/archive" element={<TableArchive />} />
        </Route>
        <Route path="/magasin" element={<Magasin />}>
          <Route path="/magasin/ajouter" element={<AjouterProduit />} />
          <Route path="/magasin/modifier/:id" element={<ModifierProduit />} />
        </Route>
        <Route path="/convention" element={<Convention />}>
          <Route
            exact
            path="/convention/ajout"
            element={<AjouterConvention />}
          />
          <Route
            exact
            path="/convention/prestation/ajouter/:id"
            element={<AjouterPresta />}
          />
          <Route
            exact
            path="/convention/prestation/:id"
            element={<TablePresta />}
          />
        </Route>
        <Route path="/*" element={<Erreur />} />
      </Routes>
    </div>
  );
}

export default App;
