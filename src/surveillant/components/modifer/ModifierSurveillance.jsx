import React, { useContext, useRef, useState, useEffect } from "react";
import Surveillance from "../doc/Surveillance";

import { SurveillanceContext } from "../../../util/context/Context";
import { ToastContainer } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import useModal from "../../../util/hooks/UseModal";
import notification from "../../../util/Notifiation";
import { listeControle } from "../../../data/surveillant/ListeControle";
import { format } from "date-fns";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
const ModifierSurveillance = () => {
  const { openModal, closeModal, modalIsOpen } = useModal();
  const navigate = useNavigate();
  const navigation = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const composantImprimable = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => composantImprimable.current,
  });
  const controleRef = useRef(null);
  const heureRef = useRef(null);
  const dateRef = useRef(null);
  const observationRef = useRef(null);
  const [controle, setControle] = useState("");

  const {
    afficherFiche,
    setAfficher,

    groupage,
    setGroupage,
    documentData,
    setDocumentData,
    nom,
    setNom,
    prenom,
    setPrenom,
    age,
    setAge,
    diagnostic,
    setDiagnostic,
    chirurgien,
    setChirurgien,
    intervention,
    setIntervention,
    reanimateur,
    setReanimateur,
    heure,
    setHeure,
    date,
    setDate,
    purfusions,
    setPurfusions,
  } = useContext(SurveillanceContext);
  const [isLoading, setLoading] = useState(false);

  const [erreur, setErreur] = useState(false);
  useEffect(() => {
    const fetchRdv = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/surveillance/${id}`
        );

        const surveillance = await response.json();

        setNom(surveillance.nom);
        setPrenom(surveillance.prenom);
        setAge(surveillance.age);
        setDate(format(new Date(surveillance.date), "yyyy-MM-dd"));

        setDiagnostic(surveillance.diagnostic);
        setIntervention(surveillance.intervention);
        setChirurgien(surveillance.chirurgien);
        setReanimateur(surveillance.reanimateur);
        setHeure(surveillance.heure);
        setGroupage(surveillance.groupage);
        setDocumentData(surveillance.documentData);
        setPurfusions(surveillance.purfusions);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRdv();
    return () => {
      setNom("");
      setPrenom("");
      setAge("");
      setDate("");
      setDocumentData([]);
      setHeure("");
      setGroupage("");

      setPurfusions({});
      setChirurgien("");
      setIntervention("");
      setReanimateur("");
      setDiagnostic("");
      setAfficher(false);

      setDiagnostic("");
    };
  }, [id]);
  const controleSperciale = () => {
    setPurfusions({
      ...purfusions,
      ...(dateRef.current.value === "jour1" && {
        jour1: observationRef.current.value,
      }),
      ...(dateRef.current.value === "jour2" && {
        jour2: observationRef.current.value,
      }),
      ...(dateRef.current.value === "jour3" && {
        jour3: observationRef.current.value,
      }),
      ...(dateRef.current.value === "jour4" && {
        jour4: observationRef.current.value,
      }),
    });
  };
  console.log("purfusion :", purfusions);
  const verifierContole = () => {
    if (
      !observationRef.current.value ||
      observationRef.current.value.trim() === ""
    ) {
      return notification.echec("veuillez ajouter un observation.");
    }
    if (controle === "purfusion") {
      return controleSperciale();
    }
    ajouterControle();
  };
  const ajouterControle = () => {
    const controleExiste = documentData.findIndex(
      (obj) => obj.titre === controleRef.current.value
    );
    if (controleExiste !== -1) {
      const updateControle = documentData.map((obj, index) => {
        if (index === controleExiste) {
          return {
            ...obj,
            ...(dateRef.current.value === "jour1" && {
              jour1: {
                ...obj.jour1,
                ...(heureRef.current.value === "06H" && {
                  h06: observationRef.current.value,
                }),
                ...(heureRef.current.value === "12H" && {
                  h12: observationRef.current.value,
                }),
                ...(heureRef.current.value === "18H" && {
                  h18: observationRef.current.value,
                }),
                ...(heureRef.current.value === "00H" && {
                  h00: observationRef.current.value,
                }),
              },
            }),
            ...(dateRef.current.value === "jour2" && {
              jour2: {
                ...obj.jour2,
                ...(heureRef.current.value === "06H" && {
                  h06: observationRef.current.value,
                }),
                ...(heureRef.current.value === "12H" && {
                  h12: observationRef.current.value,
                }),
                ...(heureRef.current.value === "18H" && {
                  h18: observationRef.current.value,
                }),
                ...(heureRef.current.value === "00H" && {
                  h00: observationRef.current.value,
                }),
              },
            }),
            ...(dateRef.current.value === "jour3" && {
              jour3: {
                ...obj.jour3,
                ...(heureRef.current.value === "06H" && {
                  h06: observationRef.current.value,
                }),
                ...(heureRef.current.value === "12H" && {
                  h12: observationRef.current.value,
                }),
                ...(heureRef.current.value === "18H" && {
                  h18: observationRef.current.value,
                }),
                ...(heureRef.current.value === "00H" && {
                  h00: observationRef.current.value,
                }),
              },
            }),
            ...(dateRef.current.value === "jour4" && {
              jour4: {
                ...obj.jour4,
                ...(heureRef.current.value === "06H" && {
                  h06: observationRef.current.value,
                }),
                ...(heureRef.current.value === "12H" && {
                  h12: observationRef.current.value,
                }),
                ...(heureRef.current.value === "18H" && {
                  h18: observationRef.current.value,
                }),
                ...(heureRef.current.value === "00H" && {
                  h00: observationRef.current.value,
                }),
              },
            }),
          };
        }
        return obj;
      });
      setDocumentData(updateControle);
    } else {
      const newDocument = {
        titre: controleRef.current.value,
        ...(dateRef.current.value === "jour1" && {
          jour1: {
            ...(heureRef.current.value === "06H" && {
              h06: observationRef.current.value,
            }),
            ...(heureRef.current.value === "12H" && {
              h12: observationRef.current.value,
            }),
            ...(heureRef.current.value === "18H" && {
              h18: observationRef.current.value,
            }),
            ...(heureRef.current.value === "00H" && {
              h00: observationRef.current.value,
            }),
          },
        }),
        ...(dateRef.current.value === "jour2" && {
          jour2: {
            ...(heureRef.current.value === "06H" && {
              h06: observationRef.current.value,
            }),
            ...(heureRef.current.value === "12H" && {
              h12: observationRef.current.value,
            }),
            ...(heureRef.current.value === "18H" && {
              h18: observationRef.current.value,
            }),
            ...(heureRef.current.value === "00H" && {
              h00: observationRef.current.value,
            }),
          },
        }),
        ...(dateRef.current.value === "jour3" && {
          jour3: {
            ...(heureRef.current.value === "06H" && {
              h06: observationRef.current.value,
            }),
            ...(heureRef.current.value === "12H" && {
              h12: observationRef.current.value,
            }),
            ...(heureRef.current.value === "18H" && {
              h18: observationRef.current.value,
            }),
            ...(heureRef.current.value === "00H" && {
              h00: observationRef.current.value,
            }),
          },
        }),
        ...(dateRef.current.value === "jour4" && {
          jour4: {
            ...(heureRef.current.value === "06H" && {
              h06: observationRef.current.value,
            }),
            ...(heureRef.current.value === "12H" && {
              h12: observationRef.current.value,
            }),
            ...(heureRef.current.value === "18H" && {
              h18: observationRef.current.value,
            }),
            ...(heureRef.current.value === "00H" && {
              h00: observationRef.current.value,
            }),
          },
        }),
      };
      setDocumentData([...documentData, newDocument]);
    }
  };
  const supprimerControle = (titre) => {
    const updatedDocumentData = documentData.filter(
      (obj) => obj.titre !== titre
    );
    setDocumentData(updatedDocumentData);
  };
  const verificationData = (e) => {
    e.preventDefault();

    openModal();
  };
  const enregitrer = async (e) => {
    closeModal();
    const data = {
      nom: nom.trimStart(),
      prenom: prenom.trimStart(),
      age: age.trimStart(),
      diagnostic: diagnostic.trimStart(),
      intervention: intervention.trimStart(),
      chirurgien: chirurgien.trimStart(),
      reanimateur: reanimateur.trimStart(),
      groupage: groupage,
      date: date,
      heure: heure,
      purfusions: purfusions,
      documentData: documentData,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/surveillance/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        notification.reussite("Fiche surveillance modifier avec succés.");
        // formRef.current.reset();
      } else {
        console.error("Erreur lors de la requête");
        notification.echec("Echec de lors de la modifiacayion de la fiche.");
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    } catch (error) {
      console.error(error);
      notification.echec("Echec de la requete.");

      // Gérer les erreurs (afficher un message d'erreur, etc.)
    }
  };
  if (erreur) {
    return <div className="intervention"> Erreur de chargement...</div>;
  }
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div
          className="intervention"
          style={afficherFiche ? { flexDirection: "column" } : {}}
        >
          {afficherFiche ? (
            <div className="section1">
              <Surveillance reference={composantImprimable} />
            </div>
          ) : (
            <div className="section1">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Date:</th>
                    <th style={{ textAlign: "left" }}>jour1:</th>
                    <th style={{ textAlign: "left" }}>jour2:</th>
                    <th style={{ textAlign: "left" }}>jour3:</th>
                    <th style={{ textAlign: "left" }}>jour4:</th>
                  </tr>
                </thead>
                <tbody>
                  {documentData.map((element, index) => (
                    <tr key={index} style={{ animation: "table 200ms ease" }}>
                      <td className="point">{element.titre}</td>
                      <td>
                        <div>
                          <p>
                            <strong>06H:</strong>{" "}
                            {element.jour1 && element.jour1.h06}
                          </p>

                          <p>
                            <strong>12H:</strong>
                            {element.jour1 && element.jour1.h12}
                          </p>

                          <p>
                            <strong>18H:</strong>
                            {element.jour1 && element.jour1.h18}
                          </p>

                          <p>
                            <strong>00H:</strong>{" "}
                            {element.jour1 && element.jour1.h00}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>
                            <strong>06H:</strong>{" "}
                            {element.jour2 && element.jour2.h06}
                          </p>

                          <p>
                            <strong>12H:</strong>
                            {element.jour2 && element.jour2.h12}
                          </p>

                          <p>
                            <strong>18H:</strong>
                            {element.jour2 && element.jour2.h18}
                          </p>

                          <p>
                            <strong>00H:</strong>{" "}
                            {element.jour2 && element.jour2.h00}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>
                            <strong>06H:</strong>{" "}
                            {element.jour3 && element.jour3.h06}
                          </p>

                          <p>
                            <strong>12H:</strong>
                            {element.jour3 && element.jour3.h12}
                          </p>

                          <p>
                            <strong>18H:</strong>
                            {element.jour3 && element.jour3.h18}
                          </p>

                          <p>
                            <strong>00H:</strong>{" "}
                            {element.jour3 && element.jour3.h00}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>
                            <strong>06H:</strong>{" "}
                            {element.jour4 && element.jour4.h06}
                          </p>

                          <p>
                            <strong>12H:</strong>
                            {element.jour4 && element.jour4.h12}
                          </p>

                          <p>
                            <strong>18H:</strong>
                            {element.jour4 && element.jour4.h18}
                          </p>

                          <p>
                            <strong>00H:</strong>{" "}
                            {element.jour4 && element.jour4.h00}
                          </p>
                        </div>
                      </td>

                      <td>
                        {" "}
                        <svg
                          onClick={(e) => supprimerControle(element.titre)}
                          style={{ cursor: "pointer" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="#637381"
                          viewBox="0 0 512 512"
                        >
                          {" "}
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                  {purfusions && Object.keys(purfusions).length !== 0 && (
                    <tr>
                      <td>Purfusions</td>
                      <td>{purfusions && purfusions.jour1}</td>
                      <td>{purfusions && purfusions.jour2}</td>
                      <td>{purfusions && purfusions.jour3}</td>
                      <td>{purfusions && purfusions.jour4}</td>
                      <td>
                        <svg
                          onClick={(e) => setPurfusions({})}
                          style={{ cursor: "pointer" }}
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          fill="#637381"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                        </svg>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div className="formulaire" style={{ alignSelf: "flex-start" }}>
            <>
              <form onSubmit={verificationData}>
                <div
                  className="partie1"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
                  }}
                >
                  <div className="input_container">
                    <label htmlFor="nom">Nom</label>
                    <input
                      type="text"
                      id="nom"
                      onChange={(e) => setNom(e.target.value)}
                      value={nom}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                      type="text"
                      id="prenom"
                      onChange={(e) => setPrenom(e.target.value)}
                      value={prenom}
                      required
                    />
                  </div>{" "}
                  <div className="input_container">
                    <label htmlFor="age">Age</label>
                    <input
                      type="text"
                      id="age"
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="diagno">diagnostic</label>
                    <input
                      type="text"
                      id="diagno"
                      onChange={(e) => setDiagnostic(e.target.value)}
                      value={diagnostic}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="intervention">Intervention</label>
                    <input
                      type="text"
                      id="intervention"
                      onChange={(e) => setIntervention(e.target.value)}
                      value={intervention}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="chirurgien">Chirurgien</label>
                    <input
                      type="text"
                      id="chirurgien"
                      onChange={(e) => setChirurgien(e.target.value)}
                      value={chirurgien}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="reanimateur">Réanimateur</label>
                    <input
                      type="text"
                      id="reanimateur"
                      onChange={(e) => setReanimateur(e.target.value)}
                      value={reanimateur}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="groupage">Groupage</label>
                    <select
                      type="text"
                      id="groupage"
                      onChange={(e) => setGroupage(e.target.value)}
                      value={groupage}
                      required
                    >
                      <option value="">---choisir---</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="input_container">
                    <label htmlFor="date">Date </label>
                    <input
                      type="date"
                      id="date"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      required
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="heure">Heure</label>
                    <input
                      type="time"
                      id="heure"
                      onChange={(e) => setHeure(e.target.value)}
                      value={heure}
                      required
                    />
                  </div>
                </div>
                <div className="partie1">
                  <div className="input_container">
                    <label htmlFor="controle">Controle</label>
                    <select
                      name="controle"
                      id="controle"
                      ref={controleRef}
                      onChange={(e) => setControle(e.target.value)}
                    >
                      {listeControle.map((element, index) => (
                        <option key={index} value={element}>
                          {element}
                        </option>
                      ))}
                      <option value="purfusion">
                        Compositions des purfusions
                      </option>
                    </select>
                  </div>{" "}
                  <div className="input_container">
                    <label htmlFor="datec">Date Controle</label>
                    <select name="datec" id="datec" ref={dateRef}>
                      <option value="jour1">Jour 1</option>
                      <option value="jour2">Jour 2</option>
                      <option value="jour3">Jour 3</option>
                      <option value="jour4">Jour 4</option>
                    </select>
                  </div>
                  {controle !== "purfusion" && (
                    <div className="input_container">
                      <label htmlFor="time">Heure</label>
                      <select name="time" id="time" ref={heureRef}>
                        <option value="06H">06H</option>
                        <option value="12H">12H</option>
                        <option value="18H">18H</option>
                        <option value="00H">00H</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="partie1">
                  <div className="input_container">
                    <label htmlFor="remarque">Observation</label>
                    <input type="text" id="remarque" ref={observationRef} />
                  </div>
                </div>

                <div className="btn">
                  <div className="btn_save">
                    <button>Enregisté</button>
                    <span onClick={navigation}>Annuler</span>
                  </div>

                  {!afficherFiche ? (
                    <span onClick={verifierContole}>Ajouter</span>
                  ) : (
                    <span onClick={handlePrint}>Imprimer</span>
                  )}

                  <span onClick={(e) => setAfficher(!afficherFiche)}>
                    {afficherFiche ? "Cacher Fiche" : "Voir Fiche"}
                  </span>
                </div>
              </form>
            </>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="custom_modal"
        style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
      >
        <p> Confirmé la modification de la fiche? </p>
        <div className="repense">
          <button onClick={enregitrer}>OUI</button>
          <button onClick={closeModal}>NON</button>
        </div>
      </Modal>
    </>
  );
};

export default ModifierSurveillance;
