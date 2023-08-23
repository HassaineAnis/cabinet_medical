import React, { useContext } from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";
const Hcg = ({ reference, nom, prenom, age, sexe }) => {
  const { date, seuilSensibilite, hcg, service } = useContext(BpoContext);
  return (
    <div className="tp" ref={reference}>
      <div className="partie1_container">
        <div className="entete">
          <h3>
            CLINIQUE MEDICO-CHIRURGICALE LA COLOMBE SERVICE / LABORATOIRE
            D'ANALYSES MEDICALES
          </h3>
          <img src={logo} alt="logo" />
        </div>

        <div className="partie1">
          <div className="infoPatient">
            <p>
              <span>
                <strong>Nom </strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {nom}
              </span>
            </p>
            <p>
              <span>
                <strong>Prénom</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {prenom}
              </span>
            </p>
            <p>
              <span>
                <strong>Sérvice</strong>
              </span>{" "}
              <span>
                <strong>: </strong>
                {service}
              </span>
            </p>
            <p>
              <span>
                {" "}
                <strong>Age</strong>
              </span>{" "}
              <span>
                <strong>: </strong> {age}
              </span>
            </p>{" "}
            <p>
              <span>
                <strong>Sexe</strong>
              </span>{" "}
              <span>
                <strong>: </strong> {sexe}
              </span>
            </p>
          </div>
          <p>
            <strong>DBK LE :</strong>{" "}
            <span>{date && new Date(date).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
      <div className="partie2">
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <p style={{ margin: "0" }} className="point">
              <strong style={{ textDecoration: "underline" }}>BHCG:</strong>
            </p>
            <p style={{ margin: "0" }}>
              <strong>.............</strong>
              <strong>{`${hcg} `}.</strong>
            </p>
          </div>
        </div>
        <span
          style={{
            marginBottom: "-0.5rem",
            textDecoration: "underline",
            marginTop: "3rem",
          }}
        >
          Valeurs Usuelles:
        </span>
        <div className="tableSemaineContainer">
          <div className="tableSemaine">
            <span>4éme</span>
            <span>à</span>
            <span>5éme</span>
            <span>semaine</span>
            <span>1 500</span>
            <span>à</span>
            <span>23 000</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>5éme</span>
            <span>à</span>
            <span>6éme</span>
            <span>semaine</span>
            <span>3 400</span>
            <span>à</span>
            <span>134 300</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>6éme</span>
            <span>à</span>
            <span>7éme</span>
            <span>semaine</span>
            <span>10 500</span>
            <span>à</span>
            <span>161 000</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>7éme</span>
            <span>à</span>
            <span>8éme</span>
            <span>semaine</span>
            <span>37 500</span>
            <span>à</span>
            <span>209 000</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>8éme</span>
            <span>à</span>
            <span>9éme</span>
            <span>semaine</span>
            <span>37 500</span>
            <span>à</span>
            <span>219 000</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>9éme</span>
            <span>à</span>
            <span>10éme</span>
            <span>semaine</span>
            <span>42 800</span>
            <span>à</span>
            <span>218 000</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>10éme</span>
            <span>à</span>
            <span>11éme</span>
            <span>semaine</span>
            <span>33 700</span>
            <span>à</span>
            <span>218 700</span>
            <span>UI/L</span>
          </div>
          <div className="tableSemaine">
            <span>11éme</span>
            <span>à</span>
            <span>12éme</span>
            <span>semaine</span>
            <span>21 800</span>
            <span>à</span>
            <span>193 200</span>
            <span>UI/L</span>
          </div>{" "}
          <div className="tableSemaine">
            <span>12éme</span>
            <span>à</span>
            <span>13éme</span>
            <span>semaine</span>
            <span>20 300</span>
            <span>à</span>
            <span>166 100</span>
            <span>UI/L</span>
          </div>{" "}
          <div className="tableSemaine">
            <span>13éme</span>
            <span>à</span>
            <span>14éme</span>
            <span>semaine</span>
            <span>15 400</span>
            <span>à</span>
            <span>190 000</span>
            <span>UI/L</span>
          </div>{" "}
          <div className="tableSemaine">
            <span>14éme</span>
            <span>à</span>
            <span>26éme</span>
            <span>semaine</span>
            <span>2 800</span>
            <span>à</span>
            <span>176 100</span>
            <span>UI/L</span>
          </div>{" "}
          <div className="tableSemaine">
            <span>26éme</span>
            <span>à</span>
            <span>39éme</span>
            <span>semaine</span>
            <span>2 800</span>
            <span>à</span>
            <span>144 400</span>
            <span>UI/L</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
          <p style={{ margin: "0" }}>
            <strong>BHCG:</strong>
          </p>
          <p style={{ margin: "0" }}>
            <strong>......</strong>
            <strong>{`${seuilSensibilite} `} UI/L.</strong>
          </p>
        </div>

        <div className="bas-page">
          <hr className="no_print" />
          <p>
            Lotissement Touares//{"(Derriére ONALAIT DBK)"} Tel /Fax :026 27 32
            20/ Tél:0550969565
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hcg;
