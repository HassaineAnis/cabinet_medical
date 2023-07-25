import React from 'react';
import TablePatient from '../components/tables/TablePatient';
import { useLocation,Outlet } from 'react-router-dom';

const Patient = (props) => {
  const location = useLocation()
    return (
        <div className="consultation">
        <div className="consultation__container">
           
          {/*  tableau des rendez-vous*/}
          {location.pathname ==='/medecin/patient' ?
          (<>
              <h2>Mes patients</h2>
               <TablePatient/>

          </>)
          :
          <Outlet/> 
          
          }
      
        </div>
      </div>
    );
}

export default Patient;