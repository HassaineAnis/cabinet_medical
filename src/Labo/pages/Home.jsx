import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";
import TablePatient from "../components/table/TablePatient";

const Home = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/laboAM" ? (
          <>
            <h2>Mes patients</h2>
            <TablePatient />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Home;
