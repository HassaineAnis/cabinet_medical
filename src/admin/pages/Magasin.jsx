import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MagasinCard from "../components/Card/MagasinCard";
import socket from "../../socket/Socket";
import { ToastContainer } from "react-toastify";

function Magasin(props) {
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const [produit, setProduit] = useState([]);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    socket.connect();

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/magasin");

        const produits = await response.json();
        //users.sort((a, b) => new Date(b.date) - new Date(a.date));
        setProduit(produits);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };
    socket.on("afterDeleteData", (data) => {
      fetchData();
    });

    fetchData();
    return () => {
      socket.off("afterDeleteData");
      socket.disconnect();
    };
  }, [location]);

  if (erreur) {
    return <div className="medecin">Erreur de chargement des donnees.</div>;
  }
  return (
    <div className="medecin">
      <ToastContainer />
      {isLoading ? (
        <div className="spinner" style={{ alignSelf: "center" }}></div>
      ) : (
        <>
          {location.pathname === "/admin/magasin" ? (
            <div className="user">
              <h2>Magasin</h2>
              <div className="user_table">
                <div className="user_table_btn">
                  <Link
                    to="/admin/magasin/ajouter"
                    className="btn_ajouter"
                    style={{ padding: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      fill="#fff"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    Ajouter Produit
                  </Link>
                </div>
                <div className="card_container">
                  {produit.map((prod) => (
                    <MagasinCard key={prod._id} data={prod} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </>
      )}
    </div>
  );
}

export default Magasin;
