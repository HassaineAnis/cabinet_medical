import React from 'react';
import ReactDOM from 'react-dom/client';
 
import "./style/index.css"
import { BrowserRouter, } from 'react-router-dom';
 import RouterPrincipal from './router/Router';
  
 
 
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
   
        
     <RouterPrincipal/>
     
     

    </BrowserRouter>
     
  </React.StrictMode>
); 
 