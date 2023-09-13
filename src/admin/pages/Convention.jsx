import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import "../../style/adminStyle/medecin.css";
import ConventionCard from "../components/Card/Convention";
function Convention(props) {
  const location = useLocation();
  return (
    <div className="medecin">
      {location.pathname === "/admin/convention" ? (
        <ConventionCard />
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default Convention;
