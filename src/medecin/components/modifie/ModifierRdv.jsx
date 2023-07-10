import React, { useRef, useState,useEffect  } from "react";
import "../../../style/medecinStyle/ajout/ajoutconsult.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import useModal from "../../../util/hooks/UseModal";
import Notification from "../../../util/Notifiation";
 
 


function ModifierRdv(props) {
    const jetonString = sessionStorage.getItem("user");
    const jeton = JSON.parse(jetonString);
    const {id} = useParams();
  
    const {openModal,closeModal,modalIsOpen} = useModal()
  
    
     
    const [motif, setMotif] = useState("");
    const formRef = useRef(null);
    const sexeRef = useRef(null);
    const nomRef = useRef(null);
    const prenomRef = useRef(null);
    const numeroTelRef = useRef(null)
    const adresseRef = useRef(null)
    const dateRef = useRef(null); 
    const ageRef = useRef(null);
    const motifRef = useRef(null)
    const typeAccouchementRef  = useRef(null)
    const typeCherurgieRef =useRef(null)
    
    const [isLoading,setLoading] = useState(false)
    const [data,setData]= useState({})
    const [erreur,setErreur] = useState(false)

    const [date,setDate] = useState(null)

    useEffect(() => {
        
      const fetchRdv = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3000/api/rendez-vous/detail/${id}`);
    
          const rendeVous = await response.json();
          setMotif(rendeVous.motif)
        
          setData(rendeVous);
        } catch (e) {
          console.log("erreur!!!", e);
          setErreur(true);
        } finally {
          setLoading(false);
          
           
           
           
     
        
        }
      };
       
    
      fetchRdv();
       
      
    }, []);
    const navigate = useNavigate();
    const navigation = () => {
      navigate(-1);
    };
  
    
  
     
   
    const verificationData = (e) => {
      e.preventDefault();
  
      openModal();
    };
  
    const modifier = async (e) => {
   closeModal()
    
      const data = {
        medecin: jeton.id,
        nom: nomRef.current.value,
        prenom: prenomRef.current.value,
        age: ageRef.current.value,
        adresse :adresseRef.current.value,
        numeroTel:numeroTelRef.current.value,
        date: dateRef.current.value,
        motif: motifRef.current.value,
         sexe:sexeRef.current.value,
         typeAccouchement : typeAccouchementRef.current? typeAccouchementRef.current.value : "",
         typeCherurgie : typeCherurgieRef.current? typeCherurgieRef.current.value : ""
  
  
  
  
         
       
         
      };
      console.log(data)
     
  
      try {
        const response = await fetch(`http://localhost:3000/api/rendez-vous/${id}`, {
            method: "PUT", // ou "PATCH" selon votre API
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
           
          Notification.reussite("Rendez-vous modifié avec succès.")
          formRef.current.reset();
        } else {
          console.error("Erreur lors de la requête");
          Notification.echec("Échec lors de la modification du rendez-vous.")
          // Gérer les erreurs (afficher un message d'erreur, etc.)
        }
      } catch (error) {
        console.error(error);
        Notification.echec("Échec de la requête.")
  
        // Gérer les erreurs (afficher un message d'erreur, etc.)
      }
    };

  
    if(erreur){
      return(
        <div className="ajouterConsult">erreur de chargement</div>
      )
    }

    return (
        <>
        <ToastContainer />
        <div className="ajouterConsult">
          <div className="ajouterConsult_entete">
            <h2>Modifier le Rendez-vous</h2>
            <span>Veuillez  modifier les champs voulu</span>
          </div>
            {isLoading? (<div className="spinner"> </div>):
            (
                <form
                onSubmit={(e) => {
                  verificationData(e);
                }}
                ref={formRef}
              >
                <div className="formulaire_nom">
                  <div className="input_container">
                    <label htmlFor="nom">Nom</label>
                    <input
                       type="text"
                       id="nom"
                       placeholder="Exemple : Dupont"
                       ref={nomRef}
                       pattern="[A-Za-z,-_\s]{3,}"
                       title="Le nom doit contenir au moins 3 caractères alphabétiques."
                       required
                       defaultValue={data.nom}
                    />
                  </div>
      
                  <div className="input_container">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        placeholder="Exemple : Jean"
                        id="prenom"
                        ref={prenomRef}
                        pattern="[A-Za-z,-_\s]{3,}"
                        title="Le prenom doit contenir au moins 3 caractères alphabétiques."
                        required
                        defaultValue={data.prenom}
                    />
                  </div>
      
                  <div className="input_container">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Exemple : 23"
                      required
                      ref={ageRef}
                      defaultValue={data.age}
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="adresse">Adresse</label>
                    <input
                   type="text"
                   id="adresse"
                   ref={adresseRef}
                   pattern="[A-Za-z,-_\s]{3,}"
                   title="L'adresse doit contenir au moins 4 caractères alphabétiques."
                   placeholder="Ex : Abarane, Tirmitine, Tizi-Ouzou"
                   required
                   defaultValue={data.adresse}
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="numeroTel">Numéro de Téléphone</label>
                    <input
                     type="text"
                     id="numeroTel"
                      ref={numeroTelRef}
                     pattern="^(05|06|07)[0-9]{8}$"
                     title="Le numéro de téléphone doit être au format algérien."
                     required
                     placeholder="Ex: 05 XX XX XX XX"
                     defaultValue={data.numeroTel}
                    />
                  </div>
                  <div className="input_container">
                    <label htmlFor="date">Date du rendez-vous</label>
                    <div className="dates">
                  <input type="date" id="date"   onChange={(e) => setDate(e.target.value)} />
                  <input
                    type="text"
                    id="dateAffiche"
                    readOnly={true}
                    ref={dateRef}
                     
                    value={date?  new Date(date).toLocaleDateString() :  new Date(data.date).toLocaleDateString()}
                   
                  
                  />
                  </div>
                  </div>
      
                  <div className="input_container">
                    <label htmlFor="sexe">Sexe</label>
                    <select name="sexe" id="sexe" required ref={sexeRef} defaultValue={data.sexe}>
                      <option value=""></option>
                      <option value="HOMME">Homme</option>
                      <option value="FEMME">Femme</option>
                    </select>
                  </div>
      
                  <div className="input_container">
                    <label htmlFor="motif">Motif du rendez-vous</label>
                    <select
                    defaultValue={data.motif}
                      name="motif"
                      id="motif"
                      onChange={(e) => setMotif(e.target.value)}
                      required
                      ref={motifRef}
                    >
                      <option value=""></option>
                      <option value="Consultation">Consultation</option>
                      <option value="Chérurgie">Chérurgie</option>
                      <option value="Accouchement">Accouchement</option>
                    </select>
                  </div>
                </div>
      
                { motif === "Accouchement"   && (
                  <div className="input_container">
                    <label htmlFor="accouchement">Type d'Accouchement</label>
                    <select name="accouchement" id="accouchement"  required ref={typeAccouchementRef} defaultValue={data.typeAccouchement}>
                      <option value="Naturel">Naturel</option>
                    </select>
                  </div>
                )}
      
                {motif === "Chérurgie" && (
                  <div className="input_container">
                    <label htmlFor="cherurgie">Type de Chérurgie</label>
                    <select name="cherurgie" id="cherurgie"  required ref={typeCherurgieRef} defaultValue={data.typeCherurgie}>
                      <option value="">......</option>
                      <option value="Esthétique">Esthétique</option>
                    </select>
                  </div>
                )}
      
                <div className="btn">
                  <button>Enregitrer</button>
                  <span onClick={navigation}>Annuler</span>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="custom_modal"
                  style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" } }}
                >
                  <p>  Confirmé la mise a jours du rendez-vous? </p>
                  <div className="repense">
                    <button onClick={modifier}>OUI</button>
                    <button onClick={closeModal}>NON</button>
                  </div>
                </Modal>
              </form>
            )
            }
          
        </div>
      </>
    );
         
    
}

export default ModifierRdv;