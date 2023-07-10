import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
 
function PrivateRoute() {
     
  const jetonString = sessionStorage.getItem("user")
  const jeton = JSON.parse(jetonString)
 
    return (
       jeton && jeton.autho?
       <Outlet/>
       :<Navigate to= '/login'/>
    );
  }

export default PrivateRoute;