 import React from 'react';
 import { Outlet ,useLocation} from 'react-router-dom'; 
 
 import TableConge from '../components/tables/TableConge';
 
 const Conge = () => {
    const location = useLocation();
    return (
        <div  className='medecin'>
             {location.pathname === "/admin/conge" ?

<TableConge />

:

<Outlet/>

}
             
            
            
        </div>
    );
 };
 
 export default Conge;