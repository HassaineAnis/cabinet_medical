import React, { useContext } from "react";
import { NaissanceContext } from "../../../util/context/Context";

const Naissance = ({ reference, data }) => {
  const {
    dateEpou,

    dateDame,

    acteN,

    lanDeuxMille,

    numero,

    grosseLettre,

    dateMariage,
    lfNumero,

    du,

    mois,

    jour,

    heure,

    minute,
    dame,

    ageDame,

    lieuEpou,

    lieuDame,

    professionDame,

    epou,

    ageEpou,

    professionEpou,

    domicile,

    sexeEnfant,

    prenomEnfant,
  } = useContext(NaissanceContext);
  return (
    <div className="navette" style={{ position: "relative" }} ref={reference}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            width: "50%",
            textAlign: "left",
            fontWeight: "600",
            fontSize: "1.1rem",
          }}
        >
          WILAYA DE TIZI-OUZOU DAIRA DE DRAA BEN KHEDDA Etablissement
          hospitalier privé la colombe
        </h3>

        <p>
          <strong>Numéro :</strong>
          {`${data ? data.numero : numero}`}
        </p>
      </div>
      <h4 style={{ textDecoration: "underline", textAlign: "center" }}>
        DECLARATION DE NAISSANCE
      </h4>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", maxWidth: "50%", wordWrap: "break-word" }}>
          <p style={{ wordWrap: "break-word" }}>
            Ecrire en grosses lettes:
            <br />
            <span> {`${data ? data.grosseLettre : grosseLettre}`}</span>
          </p>

          <p>
            <strong>Marié le :</strong>
            {` ${
              data
                ? new Date(data.dateMariage).toLocaleDateString()
                : dateMariage && new Date(dateMariage).toLocaleDateString()
            } `}
          </p>
          <p>
            <strong>L.F N° : </strong>
            {`${data ? data.lfNumero : lfNumero}`}
          </p>
          <p>
            <strong>Du :</strong>
            {` ${data ? data.du : du}`}
          </p>
          <p>
            <strong>Acte N° :</strong>
            {` ${data ? data.numeroActe : acteN}`}
          </p>
        </div>
        <div style={{ width: "70%" }}>
          <p>L'an deux mille : {` ${data ? data.deuxMille : lanDeuxMille}`}</p>

          <p>
            Et le : {` ${data ? data.jour : jour}`} du mois de{" "}
            {` ${data ? data.mois : mois}`}
          </p>
          <p>
            Nous: <strong>Dr CHALAH</strong> proposé aux entrées de la clinique
            la COLOMBE de Draa Ben Khedda, déclarons à monsieurle président de
            l'A.P.C commune de DRAA BEN KHEDDA.
          </p>
          <p>Officier de l'état civil.</p>
          <p>
            Que ce jour à :{` ${data ? data.heure : heure}`} heures
            {` ${data ? data.minute : minute} `}minutes
          </p>
          <p>la dame : {` ${data ? data.dame : dame}`}</p>

          <p>
            Agée de :{`${data ? data.ageDame : ageDame}`} ans née le :
            {`${
              data
                ? new Date(data.dateDame).toLocaleDateString()
                : dateDame && new Date(dateDame).toLocaleDateString()
            }`}
          </p>
          <p>A :{` ${data ? data.lieuDame : lieuDame}`}</p>
          <p>Profession :{` ${data ? data.professionDame : professionDame}`}</p>
          <p>Epouse de :{` ${data ? data.epou : epou}`} </p>
          <p>
            Agée de :{` ${data ? data.ageEpou : ageEpou}`} ans née le :
            {`${
              data
                ? new Date(data.dateEpou).toLocaleDateString()
                : dateEpou && new Date(dateEpou).toLocaleDateString()
            }`}
          </p>
          <p>A :{` ${data ? data.lieuEpou : lieuEpou}`}</p>
          <p>Profession :{` ${data ? data.professionEpou : professionEpou}`}</p>
          <p>Domiciliés ensemble à : {`${data ? data.domicile : domicile}`}</p>
          <p>
            A accouché d'un enfant de sexe :
            {` ${data ? data.sexeEnfant : sexeEnfant}`} auquel{" "}
          </p>
          <p>
            Elle a donné le prénom :
            {` ${data ? data.prenomEnfant : prenomEnfant}`}{" "}
          </p>
        </div>
      </div>
      <p style={{ textAlign: "right" }}>
        <strong style={{ textDecoration: "underline" }}>
          Le proposé des entrées
        </strong>
      </p>
    </div>
  );
};

export default Naissance;
