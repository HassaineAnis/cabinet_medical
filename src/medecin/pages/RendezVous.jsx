import React from "react";
import "../../style/medecinStyle/consultation.css";
import TableRdv from "../components/tables/TableRdv";
import { Outlet, useLocation } from "react-router-dom";

const RendezVous = (props) => {
  const location = useLocation();

  return (
    <div className="consultation">
      <div className="consultation__container">
         
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/medecin" ? <> <h2>Mes Rendez-vous</h2> <TableRdv /></> : <Outlet />}
      </div>
    </div>
  );
};

export default RendezVous;
