import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateSurveillant = () => {
  const jetonString = sessionStorage.getItem("user");
  const jeton = JSON.parse(jetonString);

  return jeton.autho && jeton.role === "Surveillant" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateSurveillant;
