import React from "react";
import photo from "../../../assets/medecin.jpg";
import "../../../style/adminStyle/card/magasinCard.css";
import { useNavigate } from "react-router-dom";
import notification from "../../../util/Notifiation";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import { ToastContainer } from "react-toastify";
import socket from "../../../socket/Socket";

const MagasinCard = ({ data }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();

  const calculerQntRequis = (qnt) => {
    return qnt.reduce((acc, objet) => acc + objet.qntRequis, 0);
  };
  const calculerQntManquante = (qntDispo, qntRequis) => {
    if (qntDispo > qntRequis) {
      return 0;
    } else {
      return qntRequis - qntDispo;
    }
  };
  const navigate = useNavigate();
  const navigation = () => {
    navigate(`/admin/magasin/modifier/${data._id}`);
  };

  const RemoveData = async () => {
    try {
      const reponse = await fetch(
        `http://localhost:3000/api/magasin/${data._id}`,
        {
          method: "DELETE",
        }
      );

      if (reponse.ok) {
        closeModal();
        notification.reussite(`Produit supprimer avec succés.`);
        socket.emit("supprimerData", { message: "supprimer" });
      }
    } catch (error) {
      notification.echec("Erreur de suppression.");
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="image">
        <picture>
          <img src={data.photo ? data.photo : photo} alt="img" />
        </picture>
      </div>
      <div className="infos">
        <div className="titre">
          {" "}
          <h3>{data && data.nom}</h3>
          <span>Etat du stock</span>
        </div>

        <div className="qnt">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            <p>
              Requis <span>{calculerQntRequis(data.service)}</span>
            </p>
            <p>
              Disponible <span>{data && data.quantite}</span>
            </p>
          </div>

          <p>
            Quantité Manquante
            <span style={{ backgroundColor: "darkred" }}>
              {calculerQntManquante(
                data.quantite,
                calculerQntRequis(data.service)
              )}
            </span>{" "}
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={navigation}
            style={{
              padding: "8px",
              width: "6rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Voir plus
          </button>
          <button
            onClick={openModal}
            style={{
              backgroundColor: "darkred",
              padding: "8px",
              width: "6rem",
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
          },
        }}
      >
        <p> Etes vous sur des vouloir supprimer ce produit ? </p>
        <div className="repense">
          <button onClick={RemoveData}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </div>
  );
};

export default MagasinCard;
