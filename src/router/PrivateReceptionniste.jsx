import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const PrivateReceptionniste = () => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  return jeton.autho && jeton.role === "Réceptionniste" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateReceptionniste;
