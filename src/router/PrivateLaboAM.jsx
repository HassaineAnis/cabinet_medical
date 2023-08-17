import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateLaboAM = () => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  return jeton.autho && jeton.role === "LaborantinAM" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLaboAM;
