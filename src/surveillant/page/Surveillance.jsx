import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";
import TableSurveillance from "../components/table/TableSurveillance";

const Surveillance = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des fiche surveillance*/}
        {location.pathname === "/surveillant/surveillance" ? (
          <>
            <h2>Listes fiche de Surveillance</h2>
            <TableSurveillance />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Surveillance;
