import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../style/medecinStyle/consultation.css";
import TableConsultation from "../components/table/TableConsultation";

const Consultation = () => {
  const location = useLocation();

  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/receptionniste/consultation" ? (
          <>
            {" "}
            <h2>Consultaions</h2>
            <TableConsultation />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Consultation;
