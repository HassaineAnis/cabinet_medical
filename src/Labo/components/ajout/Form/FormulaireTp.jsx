import React from "react";
import { useNavigate } from "react-router-dom";

const FormulaireTp = ({ id, imprimer }) => {
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  return (
    <form>
      <div
        className="partie1"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
        }}
      >
        <div className="input_container">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" required />
        </div>

        <div className="input_container">
          <label htmlFor="service">Sérvice</label>
          <select name="service" id="service">
            <option value="Interne">Interne</option>
            <option value="Externe">Externe</option>
          </select>
        </div>

        <div className="input_container">
          <label htmlFor="temps">Temps de Prothrombine</label>
          <input type="temps" id="temps" required />
        </div>
        <div className="input_container">
          <label htmlFor="taux">Taux{"(%)"}</label>
          <input type="taux" id="taux" required />
        </div>

        <div className="input_container">
          <label htmlFor="inr">INR</label>
          <input type="inr" id="inr" required />
        </div>

        <div className="input_container">
          <label htmlFor="activite">Activité</label>
          <input type="activite" id="activite" required />
        </div>
        <div className="input_container">
          <label htmlFor="tck">TCK</label>
          <input type="tck" id="tck" required />
        </div>
      </div>

      <div className="btn">
        <div className="btn_save">
          <button>Enregisté</button>
          <span onClick={navigation}>Annuler</span>
        </div>
        <span onClick={imprimer}>Imprimer</span>
      </div>
    </form>
  );
};

export default FormulaireTp;
