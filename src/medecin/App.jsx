import React from 'react';
import { Routes,Route} from "react-router-dom";
 
 import Header from './components/header/Header';
import RDV from './pages/RDV';
import Dossier from "./pages/Dossier"
import Consultation from "./pages/Consultation"
import '../style/medecinStyle/app.css'
import AjouterConsultation from "./components/ajout/AjouterConsultation"
import { RechargeProvider } from '../util/context/Context';
import AjouterRDV from './components/ajout/AjouterRDV';
import RendezVous from './pages/RendezVous';
import ModifierRdv from './components/modifie/ModifierRdv';
import Profil from './pages/Profil';
import Patient from './pages/Patient';
import TableRdvArchive from './components/tables/TableRdvArchive';

const App = () => {
    return (
        <div className='medecinApp'>
            <Header/>
            <RechargeProvider> 
            <Routes>
              
                <Route path='/' element={ <Dossier/>}/>
                <Route path='/dossier' element={<Patient/>} />

                <Route path='/profil' element={<Profil/>} />

                <Route path='/rendez-vous' element={<RendezVous/>} >
                <Route path='/rendez-vous/ajouter' element={<AjouterRDV/>}/>
                <Route path='/rendez-vous/archives' element={<TableRdvArchive/>}/>
                <Route path='/rendez-vous/modifier/:id' element={<ModifierRdv/>}/>

                </Route>

                <Route path='/consultation' element={<Consultation/>} >
                <Route path='/consultation/ajouter' element={<AjouterConsultation/>}/>

                </Route>
                 
            </Routes>
            </RechargeProvider>
            
        </div> 
    );
}

export default App;