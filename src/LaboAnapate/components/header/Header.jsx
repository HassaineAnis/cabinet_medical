import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/colombe.png";
import "../../../style/medecinStyle/header/header.css";
import profil from "../../../assets/avatarH.png";
import { AuthoContext } from "../../../util/context/Context";
import { useContext } from "react";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
const Header = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const { logout } = useContext(AuthoContext);
  const dataString = sessionStorage.getItem("user");
  const data = dataString && JSON.parse(dataString);
  const navigate = useNavigate();
  const deconnextion = () => {
    logout();

    navigate(`/`);
  };
  return (
    <header className="header_medecin">
      <div className="header_medecin_logo">
        <Link className="lien">
          {" "}
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <nav className="header_medecin_menu">
        <ul className="header_medecin_menu_liste">
          <li>
            <Link to={`/laboACP`} className="lien">
              Analyse{" "}
            </Link>
          </li>
          <li>
            <Link to={`/laboACP/profil`} className="lien">
              Mon Profil{" "}
            </Link>
          </li>
          <li onClick={openModal}>
            {" "}
            <Link className="lien">Déconnexion</Link>
          </li>
        </ul>
      </nav>
      <div className="header_medecin_profil">
        <div className="header_medecin_profil_info">
          <span style={{ textTransform: "capitalize" }}>
            {" "}
            {`${data && data.nom} ${data && data.prenom}`}
          </span>
          <span>{data && data.role}</span>
        </div>
        <img
          src={data ? (data.photo ? data.photo : profil) : profil}
          alt="profil"
        />
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
    </header>
  );
};

export default Header;
