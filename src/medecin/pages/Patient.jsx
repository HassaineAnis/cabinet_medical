import React from 'react';
import TablePatient from '../components/tables/TablePatient';

const Patient = (props) => {
    return (
        <div className="consultation">
        <div className="consultation__container">
           
          {/*  tableau des rendez-vous*/}
        <TablePatient/>
        </div>
      </div>
    );
}

export default Patient;