import React from 'react';
import { Outlet ,useLocation} from 'react-router-dom';
import TableEmpolye from '../components/tables/TableEmpolye';
import "../../style/adminStyle/medecin.css" 

function Employe() {
    const location = useLocation();
    return (
        <div className='medecin'>
        {location.pathname === "/admin/personnel" ?

        <TableEmpolye />

        :
    
        <Outlet/>

        }
         
        
        
    </div>
    );
}

export default Employe;