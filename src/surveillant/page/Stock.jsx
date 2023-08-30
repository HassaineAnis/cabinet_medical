import React from "react";
import "../../style/medecinStyle/consultation.css";
import { useLocation, Outlet } from "react-router-dom";

import TableProduit from "../components/table/TableProduit";

const Stock = () => {
  const location = useLocation();
  return (
    <div className="consultation">
      <div className="consultation__container">
        {/*  tableau des rendez-vous*/}
        {location.pathname === "/surveillant" ? (
          <>
            <h2>Stock des produits</h2>
            <TableProduit />
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
export default Stock;
