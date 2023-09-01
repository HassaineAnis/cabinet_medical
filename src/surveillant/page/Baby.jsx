import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";
//import TableNavette from "../components/table/TableNavette";
import TableSurveillanceBebe from "../components/table/TableSurveillanceBebe";

const Baby = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/surveillant/baby" ? (
          <>
            <h2>Liste des fiches de surveillance des bébé </h2>
            <TableSurveillanceBebe />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Baby;
