 
import Navbar from "./components/navigation/Navbar"
import Header from "./components/header/Header"
import Acceuil from "./pages/Acceuil";
import "../style/adminStyle/app.css"
import { Route,Routes } from "react-router-dom";
import Profile from "../admin/pages/Profile"
 
import Conge from "../admin/pages/Conge"
import Magasin from "../admin/pages/Magasin"
import Convention from "../admin/pages/Convention"
 
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
import ProfilEmploye from "./components/profil/ProfilEmploye"
 
 
 
 
function App() {
  
  return (
    <div className="app">
       <Navbar/>

       <Header/>
       
        <Routes>
        <Route path="/"element={<Acceuil/>}/>
        <Route path="/profile"element={<Profile/>}/>
        
        <Route path="/utilisateurs" element={<Utilisateur/>}>
          
           
        </Route>
        <Route  path="/utilisateurs/medecin" element={<Medecins/>}>
        <Route  path="/utilisateurs/medecin/ajouter" element={<AjouterUser specialite={specialiteMedecin}/>}/ >
        <Route path="/utilisateurs/medecin/profile/:id" element={<ProfilMedecin specialite={specialiteMedecin}/>}/ >
        </Route>

        <Route  path="/utilisateurs/receptionniste" element={<UsersRestant role="Réceptionniste" route={"/admin/utilisateurs/receptionniste"} nomBtn="Ajouter Un Réceptionniste" titre="Liste Des Récecionnistes" /> }>
        <Route  path="/utilisateurs/receptionniste/ajouter" element={<AjouterAutreUsers titre="Informations Du Réceptionniste" role="Réceptionniste"/>}/ >
        <Route path="/utilisateurs/receptionniste/profile/:id" element={<ProfilUsers />}/>
        </Route>

        <Route  path="/utilisateurs/pharmacien" element={<UsersRestant role="Pharmacien"route={"/admin/utilisateurs/pharmacien"} nomBtn="Ajouter Un Pharmacien" titre="Liste Des Pharmaciens"/>}>
        <Route  path="/utilisateurs/pharmacien/ajouter" element={<AjouterAutreUsers titre="Informations Du Pharmacien" role="Pharmacien" />}/ >
        </Route>

        <Route  path="/utilisateurs/laborantinACP" element={<UsersRestant role="LaborantinAM" route={"/admin/utilisateurs/laborantinACP"} nomBtn="Ajouter Un LaborantinAM" titre="Liste Des LaborantinAM"/>}>
        <Route  path="/utilisateurs/laborantinACP/ajouter" element={<AjouterAutreUsers titre="Informations Du LAborantin"/>}/>
        </Route>
        <Route  path="/utilisateurs/pharmacienAM" element={<UsersRestant role="RéceptionnisteACP"route={"/admin/utilisateurs/pharmacienAM"}/>}/>


         
      
        <Route path="/personnel"element={<Employe/>}>
        <Route path="/personnel/ajouter" element={<AjouterEmploye specialite={specialitePersonnel}/>} />
        <Route path="/personnel/profile/:id" element={<ProfilEmploye specialite={specialitePersonnel}/>}/>
         
          </Route>
         
        <Route path="/conge"element={<Conge/>}/>
        <Route path="/magasin"element={<Magasin/>}/>
        <Route path="/convention"element={<Convention/>}/>  
        <Route path="/*"element={<Erreur/>}/>  
        </Routes>
             
    </div>
  );
}

export default App;
