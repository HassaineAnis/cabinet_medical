import React, { useState, useRef, useEffect } from "react";

import "../../../style/adminStyle/table/tableUser.css";
import { useNavigate, useParams } from "react-router-dom";

import "../../../style/loader/loader.css";

import image from "../../../assets/medecin.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Formulaire from "../Card/Formulaire";

const ModifierProduit = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [fetchData, setFetch] = useState({});
  const [erreur, setErreur] = useState(false);
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };

  const [quantite, setQuantite] = useState(0);
  const [nomProduit, setnomProdui] = useState("");
  const [photo, setPhoto] = useState("");
  // State to store the total sum of qntActuel values
  const [totalQntActuel, setTotalQntActuel] = useState(0);
  const [updatedService, setupdate] = useState([]);
  const [photofile, setFile] = useState("");

  const updateTotalQntActuel = (value, index) => {
    const tab = updatedService;

    tab[index].qntActuel = value;

    const newTotal = updatedService.reduce(
      (acc, curr) => acc + curr.qntActuel,
      0
    );

    setTotalQntActuel(newTotal);
  };

  const [imageUrl, setImageUrl] = useState(null);
  const verifieData = (e) => {
    e.preventDefault();
  };
  const ajouterPhoto = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = (e) => {
    setImageUrl(null);

    setPhoto("");
  };
  const afficherPhoto = () => {
    if (photo === "") {
      return image;
    } else {
      return photo;
    }
  };
  console.log("file:", photofile, "imagepresente", photo);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/magasin/${id}`);

        const produit = await response.json();
        setupdate(produit.service);
        setTotalQntActuel(
          produit.service.reduce((acc, curr) => acc + curr.qntActuel, 0)
        );
        setPhoto(produit.photo);
        setnomProdui(produit.nom);
        setQuantite(produit.quantite);
        setFetch(produit);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  if (erreur) {
    return (
      <div className="container_form">Erreur de chargement des donnes</div>
    );
  }

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="container_form">
          <h2>Modifier le Produit</h2>
          <hr />

          <form onSubmit={verifieData}>
            <div className="image_upload">
              <picture>
                <img src={imageUrl ? imageUrl : afficherPhoto()} alt="user" />
              </picture>

              <div className="btn_photo">
                <label htmlFor="photo">Ajouter une nouvelle photo</label>

                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={(e) => ajouterPhoto(e)}
                />
              </div>
              <button type="button" onClick={resetPhoto}>
                Reset
              </button>
            </div>
            <div className="input_section">
              <div className="input_conteneur">
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  id="nom"
                  value={nomProduit}
                  onChange={(e) => setnomProdui(e.target.value)}
                />
              </div>
              <div className="input_conteneur">
                <label htmlFor="qnt">Quantité</label>
                <input
                  type="number"
                  id="qnt"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </div>{" "}
            </div>
            <hr style={{ width: "100%" }} />
            <div className="service">
              {fetchData.service &&
                fetchData.service.map((element, index) => (
                  <Formulaire
                    key={index}
                    data={element}
                    updateQntActuel={(value) =>
                      updateTotalQntActuel(value, index)
                    }
                    totalQntActuel={totalQntActuel}
                    qntProduit={quantite}
                    id={id}
                    nomProduit={nomProduit}
                    photo={photofile !== "" ? photofile : photo}
                  />
                ))}
            </div>
          </form>
          <hr />
          <button onClick={navigation}>Annuler</button>
        </div>
      )}
    </>
  );
};

export default ModifierProduit;
