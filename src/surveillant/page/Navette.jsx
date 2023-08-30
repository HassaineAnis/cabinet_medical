import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";
import TableNavette from "../components/table/TableNavette";

const Navette = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/surveillant/navette" ? (
          <>
            <h2>Liste de fiches navette</h2>
            <TableNavette />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
export default Navette;
