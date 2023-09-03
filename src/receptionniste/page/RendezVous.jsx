import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../style/medecinStyle/consultation.css";
import TableRdv from "../components/table/TableRdv";
const RendezVous = () => {
  const location = useLocation();

  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/receptionniste" ? (
          <>
            {" "}
            <h2>Liste Rendez-vous</h2>
            <TableRdv />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default RendezVous;
