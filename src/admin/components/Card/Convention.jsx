import React, { useEffect, useState } from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../style/adminStyle/table/tableUser.css";
import { Link } from "react-router-dom";

const Convention = () => {
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [recherche, setRecherche] = useState(false);

  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setSearchTerm(event.target.value);
      setRecherche(true);
    } else {
      setRecherche(false);
    }
  };
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/convention`);

        const convention = await response.json();
        //rendeVous.sort((a, b) => new Date(a.date) - new Date(b.date));
        const resultRecherche = convention.filter((element) => {
          const dci = `${element.convention}`.toLowerCase();

          const prefix = searchTerm.toLowerCase();

          return dci.startsWith(prefix);
        });

        setData(!recherche ? convention : resultRecherche);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRdv();
  }, [recherche, searchTerm]);
  return (
    <div className="user">
      <ToastContainer />
      <h2>Conventions</h2>
      <div className="user_table">
        <div className="user_table_btn">
          <Link to={`/admin/convention/ajout`} className="btn_ajouter">
            Ajouter une convention
          </Link>
          <SearchBar />
        </div>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {data.map((element) => (
              <Link
                to={`/admin/convention/prestation/${element._id}`}
                style={{
                  height: "5rem",
                  width: "15rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  backgroundColor: "darkgreen",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                {element.convention}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Convention;
