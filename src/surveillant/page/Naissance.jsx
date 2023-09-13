import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";
import TableNaissance from "../components/table/TableNaissance";

const Naissance = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/surveillant/naissance" ? (
          <>
            <h2>Liste des Declarations de Naissance </h2>
            <TableNaissance />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Naissance;
