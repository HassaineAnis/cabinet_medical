import React from 'react';
 
import { Navigate } from 'react-router-dom';

const RoutePrive =({children}) => {
 const jetonString = localStorage.getItem("user")
 const jeton = JSON.parse(jetonString)

 if(jeton.autho && jeton.role==="MEDECIN"  ){
    return <Navigate to="/login" />
 }
 return children
 
      
};

export default RoutePrive;