import React from "react";
import "../../style/adminStyle/medecin.css";
import TableAutreUsers from "../components/tables/TableAutreUsers";
import { useLocation,Outlet } from "react-router-dom";

const UsersRestant = ({ role, route ,titre,nomBtn }) => {
    const location = useLocation()
  return (
    <div className="medecin">
      {location.pathname === route ? (
        <TableAutreUsers
          titre={titre}
          bouttonName={nomBtn}
          route={route}
          role={role}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default UsersRestant;
