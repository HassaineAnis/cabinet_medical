import { useContext } from "react";
import React from "react";
import logo from "../../../../assets/logo (1).png";
import "../../../../style/laboAM/documentAM/tp.css";
import { BpoContext } from "../../../../util/context/Context";
const Psat = ({ reference, nom, prenom, age, sexe, data, dateService }) => {
  const {
    date,
    psat,
    k,
    na,
    inograme,

    service,
  } = useContext(BpoContext);
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
                {dateService ? dateService.service : service}
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
            <span>
              {" "}
              {dateService
                ? new Date(dateService.date).toLocaleDateString()
                : date && new Date(date).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      <div className="partie2">
        <>
          <div style={{ display: "flex", alignSelf: "center", gap: "0.2rem" }}>
            <p
              className="point"
              style={{ textDecoration: "underline", margin: "0" }}
            >
              <strong>Dosage de la PSA.T:</strong>
            </p>

            <p style={{ margin: "0" }}>
              <strong>......</strong>
              {`${data ? data.psat : psat} `}
              <strong>ng/ml.</strong>
            </p>
          </div>
          <span style={{ textDecoration: "underline", alignSelf: "center" }}>
            Valeurs Usuelles:
          </span>
        </>

        <table className="table2">
          <thead>
            <tr>
              <th style={{ border: "0" }}></th>
              <th colSpan={2}>Concentration de PSA(ng/ml)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Age(ans)</strong>{" "}
              </td>
              <td>
                <strong>Limite basse</strong>{" "}
              </td>
              <td>
                <strong>Limite haute</strong>{" "}
              </td>
            </tr>
            <tr>
              <td>{"<40"}</td>
              <td>{"0.21"}</td> <td>{"1.72"}</td>
            </tr>
            <tr>
              <td>{"40-49"}</td>
              <td>{"0.27"}</td> <td>{"2.19"}</td>
            </tr>
            <tr>
              <td>{"50-59"}</td>
              <td>{"0.27"}</td> <td>{"3.42"}</td>
            </tr>
            <tr>
              <td>{"60-69"}</td>
              <td>{"0.22"}</td> <td>{"6.16"}</td>
            </tr>
            <tr>
              <td>{">69"}</td>
              <td>{"0.21"}</td> <td>{"6.77"}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <>
          <div style={{ display: "flex", alignSelf: "center", gap: "0.2rem" }}>
            <p
              className="point"
              style={{ textDecoration: "underline", margin: "0" }}
            >
              <strong>Ionogramme Sanguin :</strong>
            </p>

            <p style={{ margin: "0" }}>
              <strong>......</strong>
              {`${data ? data.inograme : inograme} `}
              <strong>ng/ml.</strong>
            </p>
          </div>
        </>

        <table className="table2">
          <thead>
            <tr>
              <th style={{ border: "none" }}></th>
              <th colSpan={2}>Valeurs Usuelles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Na+</strong>{" "}
              </td>
              <td>{data ? data.na : na}</td>
              <td>135 - 148 Mmol/l</td>
            </tr>
            <tr>
              <td>
                <strong>K+</strong>{" "}
              </td>
              <td>{data ? data.k : k}</td>
              <td>3.5 - 5.3 Mmol/l</td>
            </tr>
          </tbody>
        </table>

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

export default Psat;
