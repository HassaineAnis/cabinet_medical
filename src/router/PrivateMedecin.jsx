import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateMedecin() {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  return jeton.autho && jeton.role === "Médecin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateMedecin;
