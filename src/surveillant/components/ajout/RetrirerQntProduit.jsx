import React, { useRef, useState, useEffect } from "react";
import "../../../style/medecinStyle/ajout/ajoutconsult.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
const RetrirerQntProduit = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const { id } = useParams();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const [data, setData] = useState({});
  const [quantiteTotale, setTotale] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  const quantiteRef = useRef(null);
  const serviceRef = useRef(null);

  const dateSortieRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/produit/${id}`);

        const { produit, quantiteTotale } = await response.json();

        setData(produit);
        setTotale(quantiteTotale);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRdv();
  }, [id]);
  const verificationData = (e) => {
    e.preventDefault();
    if (quantiteRef.current.value > quantiteTotale) {
      return notification.echec("Quantité en stock dépassé");
    }

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      produit: id,
      date: dateSortieRef.current.value,

      service: serviceRef.current.value,
      quantite: quantiteRef.current.value,

      typeOperation: "retrait",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/quantite/retirer",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite("Quantité Produit retiré avec succés.");
        formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec(
          "Echec de lors du retrait de la quantité du produit."
        );
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };
  console.log(data);
  return (
    <>
      <ToastContainer />
      <div className="ajouterConsult">
        {isLoading ? (
          <div className="spinner" style={{ alignSelf: "center" }}></div>
        ) : (
          <>
            {" "}
            <div className="ajouterConsult_entete">
              <h2>Sortir une qauntité de {data.denominationComerciale} </h2>
              <span>Veuillez remplire les champs</span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    Dénomination Comerciale:
                  </strong>
                  {` ${data.denominationComerciale}`}
                </p>
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    DCI:
                  </strong>
                  {` ${data.dci}`}
                </p>{" "}
                <p>
                  <strong
                    style={{ textDecoration: "underline", color: "darkgreen" }}
                  >
                    Quantité en stock:
                  </strong>
                  {` ${quantiteTotale}`}
                </p>
              </div>
            </div>
            <form onSubmit={verificationData} ref={formRef}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(25rem, 1fr))",
                  gap: "1rem",
                }}
              >
                <div className="input_container">
                  <label htmlFor="dateEntre">Date De Sortie</label>
                  <input
                    type="date"
                    id="dateEntre"
                    ref={dateSortieRef}
                    required
                  />
                </div>
                <div className="input_container">
                  <label htmlFor="service">Service</label>
                  <select type="" id="service" ref={serviceRef} required>
                    <option value="">---services---</option>
                    <option value="Hospitalisation">Hospitalisation</option>
                    <option value="bloc">Bloc</option>
                    <option value="Matérnité">Matérnité</option>
                  </select>
                </div>{" "}
                <div className="input_container">
                  <label htmlFor="qnt">Quantité</label>
                  <input type="number" id="qnt" ref={quantiteRef} required />
                </div>
              </div>
              <div className="btn">
                <button>Enregitrer</button>
                <span onClick={navigation}>Annuler</span>
              </div>
            </form>
          </>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="custom_modal"
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
        >
          <p> Confirmé l'ajout de la quantité? </p>
          <div className="repense">
            <button onClick={enregitrer}>OUI</button>
            <button onClick={closeModal}>NON</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RetrirerQntProduit;
