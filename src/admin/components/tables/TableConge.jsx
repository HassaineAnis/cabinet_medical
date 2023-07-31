import React from "react";
import SearchBar from "../../../medecin/components/serchBar/SearchBar";
import Pagination from "../pagination/Pagination";
import "../../../style/adminStyle/table/tableUser.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../../style/loader/loader.css"
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from '../../../util/Notifiation';
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profil from "../../../assets/avatarH.png"
import socket from "../../../socket/Socket";
 

const nombreElementPage = 5;


 


const TableConge = () => {

    const [isLoading, setLoading] = useState(false);
     

    


    return (
        <div className="user">
        <ToastContainer/>
      <h2>Liste des Employés</h2>
      <div className="user_table">
        <div className="user_table_btn">
          <Link
            to={`/admin/conge/ajouter`}
            className="btn_ajouter"
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
            Ajouté Un Employé
          </Link>
          <SearchBar />
        </div>
      </div>
      {isLoading ? (
        <div className="spinner" style={{alignSelf:"center"}}> </div>
      ) : (
        <div className="consultation_table__content">
          <table className="table">
            <thead>
              <tr className="table_entete">
                <td>Nom</td>
                <td>Prénom</td>
                <td>Date de sortie</td>
                <td>Date d'entrée</td>
                <td>N° jours pris</td>
                <td>N° jours restant</td>
                <td></td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {/*currentData.map((element) => (
                <tr key={element._id} >
                  <td>{element.nom}</td>
                  <td>{element.prenom}</td>
                  <td>{element.sexe}</td>
                  <td>{element.numeroTel}</td>
                  <td>
                    {new Date(element.dateNaissance).toLocaleDateString()}
                  </td>
                  <td>{element.adresse}</td>
                  <td>{element.numeroSecurite}</td>

                  <td>
                    <div className="action">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width={20}
                        height={20}
                        fill="#637381"
                       
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                      </svg>
                        <Link to = {`/admin/personnel/profile/${element._id}`}>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="#637381"
                        viewBox="0 0 512 512"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                        </Link>
                    
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        fill="#637381"
                        viewBox="0 0 448 512"
                        
                      >
                        {" "}
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))*/}
            </tbody>
        

       
          </table>
          <Pagination
           
          />

          


        </div>
      )}
    </div>
    );
};

export default TableConge;