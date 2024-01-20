import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateLaboPath = () => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  return jeton.autho && jeton.role === "LaborantinACP" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLaboPath;
