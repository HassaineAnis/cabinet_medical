import React, {  useContext } from "react";
import "../../../style/adminStyle/menu.css";

import Modal from "react-modal";
import "../../../style/adminStyle/popup/modal.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthoContext } from "../../../util/context/Context";
import useModal from "../../../util/hooks/UseModal";
Modal.setAppElement("#root");

function Navbar(props) {
  const { logout } = useContext(AuthoContext);

  const { modalIsOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();
  const deconnextion = () => {
    logout();
    navigate("/");
  };

 

  return (
    <div className="menu">
      <div className="menu_list_container">
        <ul className="menu_list">
          <li>
            <Link to="/admin" className="menu_list_lien">
              <span>Acceuil</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.261 4.745a.375.375 0 0 0-.518 0l-8.63 8.244a.374.374 0 0 0-.115.271l-.002 7.737a1.5 1.5 0 0 0 1.5 1.5h4.505a.75.75 0 0 0 .75-.75v-6.375a.375.375 0 0 1 .375-.375h3.75a.375.375 0 0 1 .375.375v6.375a.75.75 0 0 0 .75.75h4.503a1.5 1.5 0 0 0 1.5-1.5V13.26a.374.374 0 0 0-.116-.271L12.26 4.745Z" />
                <path d="M23.011 11.444 19.505 8.09V3a.75.75 0 0 0-.75-.75h-2.25a.75.75 0 0 0-.75.75v1.5L13.04 1.904c-.254-.257-.632-.404-1.04-.404-.407 0-.784.147-1.038.405l-9.97 9.539a.765.765 0 0 0-.063 1.048.749.749 0 0 0 1.087.05l9.726-9.294a.375.375 0 0 1 .519 0l9.727 9.294a.75.75 0 0 0 1.059-.02c.288-.299.264-.791-.036-1.078Z" />
              </svg>
            </Link>{" "}
          </li>

          <li>
            <Link to="/admin/profile" className="menu_list_lien">
              {" "}
              <span>Mon Profile</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 1c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                  clipRule="evenodd"
                />
                <path d="M6 17.815c0-.516.386-.953.9-1.01 3.857-.427 6.36-.389 10.209.01a.995.995 0 0 1 .554 1.736c-4.542 3.959-7.139 3.904-11.343.003a1.01 1.01 0 0 1-.32-.739Z" />
                <path
                  fillRule="evenodd"
                  d="M17.058 17.312c-3.819-.395-6.286-.433-10.103-.01a.514.514 0 0 0-.295.886c2.084 1.933 3.663 2.806 5.207 2.812 1.548.006 3.213-.86 5.468-2.826a.495.495 0 0 0-.277-.862ZM6.845 16.308c3.898-.431 6.436-.392 10.315.009a1.495 1.495 0 0 1 .832 2.61c-2.288 1.994-4.193 3.08-6.129 3.073-1.941-.007-3.762-1.112-5.883-3.08a1.514 1.514 0 0 1 .865-2.613Z"
                  clipRule="evenodd"
                />
                <path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                <path
                  fillRule="evenodd"
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>{" "}
          </li>

          <li>
            <Link to="/admin/utilisateurs" className="menu_list_lien">
              {" "}
              <span>Utilisateurs</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 640 512"
              >
                <path d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z" />
              </svg>
            </Link>
          </li>

         

          <li>
            <Link to="/admin/personnel" className="menu_list_lien">
              {" "}
              <span>Employés</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 12c1.934 0 3.5-1.566 3.5-3.5S10.434 5 8.5 5A3.499 3.499 0 0 0 5 8.5C5 10.434 6.566 12 8.5 12Z" />
                <path d="M19.5 10.25a2.75 2.75 0 1 1-5.5 0 2.75 2.75 0 1 1 5.5 0Z" />
                <path d="M8.5 13c1.367 0 3.591.426 5.05 1.273.596.606.95 1.268.95 1.927V19H2v-2.8C2 14.072 6.33 13 8.5 13Z" />
                <path d="M22 19h-6.5v-2.8c0-.708-.255-1.36-.662-1.942.77-.172 1.53-.258 2.109-.258C18.81 14 22 14.893 22 16.667V19Z" />
              </svg>
            </Link>
          </li>

          <li>
            <Link to="/admin/conge" className="menu_list_lien">
              {" "}
              <span>Conges</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M17.5 20a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M17.5 15.75a.5.5 0 0 1 .5.5v1.043l.354.354a.5.5 0 1 1-.708.707L17 17.707V16.25a.5.5 0 0 1 .5-.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M7 11.5H6v1h1v-1Zm-1-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M11 11.5h-1v1h1v-1Zm-1-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M15 11.5h-1v1h1v-1Zm-1-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M7 15.5H6v1h1v-1Zm-1-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M11 15.5h-1v1h1v-1Zm-1-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4 6a.5.5 0 0 1 .5-.5H7v-1H4.5A1.5 1.5 0 0 0 3 6v12a1.5 1.5 0 0 0 1.5 1.5h10.127a3.487 3.487 0 0 1-.482-1H4.5A.5.5 0 0 1 4 18V6Zm13 8.035a3.538 3.538 0 0 1 1 0V6a1.5 1.5 0 0 0-1.5-1.5H15v1h1.5a.5.5 0 0 1 .5.5v8.035ZM8 5.5h5.281v-1H8v1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M14 4.5H8V6a.5.5 0 1 1-1 0V4.5H4.5a1 1 0 0 0-1 1V8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1H15V6a.5.5 0 0 1-1 0V4.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M18 9H4V8h14v1Z"
                  clipRule="evenodd"
                />
                <path d="M6 3.5a.5.5 0 1 1 1 0v2a.5.5 0 1 1-1 0v-2Z" />
                <path d="M13 3.5a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0v-2Z" />
              </svg>
            </Link>
          </li>

          <li>
            <Link to="/admin/magasin" className="menu_list_lien">
              {" "}
              <span>Magasin</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.25 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M18.75 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path d="M7.865 14.25h12.25l1.8-9H6.276L5.88 3H1.5v1.5h3.12l2.25 12.75h13.38v-1.5H8.13l-.265-1.5Z" />
              </svg>
            </Link>
          </li>
          <li>
            <Link to="/admin/convention" className="menu_list_lien">
              {" "}
              <span>Conventions</span>
              <svg
                width={30}
                height={30}
                fill="#637381"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5 3.5v15A1.5 1.5 0 0 0 6.5 20H13v-1.767a2 2 0 1 1 2 0V20h2.5a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 17.5 2h-11A1.5 1.5 0 0 0 5 3.5Zm9 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-5-12a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5ZM7.5 8a.5.5 0 1 0 0 1h9a.5.5 0 0 0 0-1h-9ZM7 10.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm.5 1.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9Z"
                  clipRule="evenodd"
                />
                <path d="M13 22v-2h2v2l-1-.75-1 .75Z" />
              </svg>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu_log_out" onClick={openModal}>
        <div className="menu_log_out_lien">
          <svg
            width={30}
            height={30}
            fill="#637381"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6h1Z" />
            <path d="m20.82 11.421-2.82-4a1 1 0 1 0-1.63 1.16l1.72 2.42H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 1.6 1.2l3-4a1 1 0 0 0 .02-1.18Z" />
          </svg>
          <span>Se deconnecter</span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 2 },
        }}
      >
        <h2>Se déconnecter?</h2>
        <div className="repense">
          <button onClick={(e) => deconnextion()}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
