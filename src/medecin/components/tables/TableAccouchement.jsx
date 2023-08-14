import React, { useState, useEffect } from "react";

import Pagination from "../../../admin/components/pagination/Pagination";
import "../../../style/medecinStyle/consultation.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";
//import socket from '../../../socket/Socket';
import "../../../style/medecinStyle/popup/modalRdv.css";

const nombreElementPage = 6;

const TableAccouchement = ({ id }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [currentObjet, setObjet] = useState({});

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);

  const navigate = useNavigate();
  const navigation = (id) => {
    navigate(`/medecin/patient/dossier/intervention/details/${id}`);
  };

  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/intervention/patient/${id}`
          );

          const consult = await response.json();
          // consult.sort((a, b) => new Date(a.date) - new Date(b.date));
          const interventionFilter = consult.filter(
            (element) => element.typeIntervention === "Accouchement"
          );
          setTotalPages(
            Math.ceil(interventionFilter.length / nombreElementPage)
          );
          setData(interventionFilter);
        } catch (e) {
          console.log("erreur!!!", e);
          setErreur(true);
        } finally {
          setLoading(false);

          setCurrentPage(1);
        }
      }
    };

    fetchRdv();
  }, []);
  const indiceDepart = (currentPage - 1) * nombreElementPage;
  const currentData = data.slice(
    indiceDepart,
    indiceDepart + nombreElementPage
  );

  function pageSuivante(page) {
    setCurrentPage(page);
  }

  if (erreur) {
    return <div>Erreur de chargement</div>;
  }

  return (
    <div className="table_rdv_patient">
      <div className="consultation_table__content">
        <table className="table">
          <thead>
            <tr className="table_entete">
              <td>Date</td>
              <td>Type intervention</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((element) => (
              <tr key={element._id}>
                <td> {new Date(element.date).toLocaleDateString()} </td>
                <td>{element.interventionPratique}</td>

                <td>
                  <div className="action">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={20}
                      height={20}
                      fill="#637381"
                      onClick={(e) => navigation(element._id)}
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageActuel={currentPage}
          totalPage={totalPages}
          cliqueAvancer={pageSuivante}
        />
      </div>
      <div className="table_btn">
        <Link
          to={`/medecin/patient/dossier/accouchement/ajouter/${id}`}
          className="btn_ajout"
          style={{
            textDecoration: "none",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            width={25}
            height={25}
            fill="none"
            stroke="#FFFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          Ajouter
        </Link>
      </div>
    </div>
  );
};

export default TableAccouchement;
