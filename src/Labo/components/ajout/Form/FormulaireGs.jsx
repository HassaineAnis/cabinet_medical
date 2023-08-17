import React from "react";
import { useNavigate } from "react-router-dom";
const FormulaireGs = ({ id, imprimer }) => {
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
          <label htmlFor="gs">Groupe sanguin</label>
          <input type="gs" id="gs" required />
        </div>
        <div className="input_container">
          <label htmlFor="rhesus">Rhésus</label>
          <input type="rhesus" id="rhesus" required />
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

export default FormulaireGs;
