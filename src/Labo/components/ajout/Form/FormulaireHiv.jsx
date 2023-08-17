import React from "react";
import { useNavigate } from "react-router-dom";
const FormulaireHiv = ({ id, imprimer }) => {
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
          <label htmlFor="hiv">HIV</label>
          <input type="hiv" id="hiv" required />
        </div>
        <div className="input_container">
          <label htmlFor="hbs">HBS</label>
          <input type="hbs" id="hbs" required />
        </div>
        <div className="input_container">
          <label htmlFor="hcv">HCV</label>
          <input type="hcv" id="hcv" required />
        </div>
        <div className="input_container">
          <label htmlFor="bw">BW</label>
          <input type="bw" id="bw" required />
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

export default FormulaireHiv;
