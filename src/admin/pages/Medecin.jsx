import React from 'react';
import "../../style/adminStyle/medecin.css" 
import TableUsers from '../components/tables/TableUsers';
import { Outlet ,useLocation} from 'react-router-dom';

const Medecin = () => {
    const location = useLocation()

    return (
        <div className='medecin'>
            {location.pathname === "/admin/utilisateurs/medecin" ?

            <TableUsers titre="Liste Des Médecins" bouttonName="Ajouter Un Médecin" />

            :
        
            <Outlet/>

            }
             
            
            
        </div>
    );
}

export default Medecin;