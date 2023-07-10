import React, { useState, useRef } from "react";
import "../../../style/adminStyle/ajout/profil.css";
import profil from "../../../assets/avatarH.png";
import { useFetch } from "../../../util/hooks/HookApi";
import "../../../style/loader/loader.css";
import { useParams,useNavigate,useLocation } from "react-router-dom";

function ProfilMP(props) {
  const { id } = useParams();
  const [afficherMdp, setafficherMdp] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const urlApi = location.pathname === `/admin/medecin/profile/${id}` ? `http://localhost:3000/api/medecin/info/${id}`:`http://localhost:3000/api/personnel/info/${id}`
  const navigation=()=>{
    if(location.pathname===`/admin/medecin/profile/${id}`){
      return navigate("/admin/medecin")
    }
    else{
      return navigate("/admin/personnel")
    }
  }

  const { isLoading, erreur, data } = useFetch(
    `${urlApi }`
  );

  const [dateNaissance, setDateNaissance] = useState(null);
  const [dateEntre, setDateEntre] = useState(null);
  const [dateSortie, setDateSortie] = useState(null);
  const nomRef = useRef("");
  const dateNaissanceRef = useRef("")
  const dateEntreRef = useRef("")
  const dateSortieRef=useRef("")
  const prenomref = useRef("");
  const genreRef = useRef("");
  const numeroTelephoneRef = useRef("");
  const numeroSecuriteRef = useRef("");
  const passwordRef = useRef("");
  const etatCivilRef = useRef("");
  const specialiteRef = useRef("");
  const observationRef = useRef("");
  const photoRef = useRef("");
 

  const afficherPhoto = ()=>{
    if(data.photo===""){
         return profil
    
    }else{
      return data.photo
    }

    
  }
  const afficherDateSortie =()=>{
    if(data.date_sortie){
      return new Date(data.date_sortie).toLocaleDateString()
    }else{
      return "Non renseigné!"
    }
  }


  const ajouterPhoto = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


 const modifierDonnees=(e)=>{
  e.preventDefault();
  const formaData = new FormData();
  if(photoRef.current.files[0]){
    formaData.append("photo", photoRef.current.files[0]);
  }else{ 
    formaData.append("photo",data.photo);
  }
  
   
   
  formaData.append("nom", nomRef.current.value);
  formaData.append("prenom", prenomref.current.value);
  formaData.append("numero_tel", parseInt(numeroTelephoneRef.current.value));

  formaData.append("mot_passe", passwordRef.current.value);
  formaData.append("specialite", specialiteRef.current.value);
  formaData.append("genre", genreRef.current.value);
  formaData.append("etat_civile", etatCivilRef.current.value);
  formaData.append("date_naissance", dateNaissanceRef.current.value);
  formaData.append("date_entre", dateEntreRef.current.value);
  formaData.append("date_sortie", dateSortieRef.current.value);
  formaData.append(
    "numero_securite",
    parseInt(numeroSecuriteRef.current.value)
  );
formaData.append("observation",observationRef.current.value)

   
 }



  if (erreur) {
    return <div>Erreur de chargement </div>;
  }

  return (
    <div className="profil">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="profil_container">
          <form onSubmit={(e)=>modifierDonnees(e)}>
            <div className="afficher_photo">
              <div className="photo">
                <label htmlFor="photo">Changer la photo</label>

                <img src={ imageUrl? imageUrl: afficherPhoto()} alt="photoProfil" />

                <input type="file" name="photo" id="photo"  ref={photoRef} onChange={(e)=>ajouterPhoto(e)}/>
              </div>

              <p>Cliqué sur les champs pour modifier.</p>
            </div>

            <div className="info">
              <div className="input_conteneur">
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" ref={nomRef} defaultValue={data.nom} />
              </div>

              <div className="input_conteneur">
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" ref={prenomref} defaultValue={data.prenom} />
              </div>

              <div className="input_conteneur">
                <label htmlFor="genre">Genre</label>
                <select name="genre" id="genre" ref={genreRef} defaultValue={data.genre}>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div className="input_conteneur">
                <label htmlFor="numero">Numero de téléphone</label>
                <input type="text" id="numero" ref={numeroTelephoneRef} defaultValue={data.numero_tel} />
              </div>

              <div className="input_conteneur">
                <label htmlFor="numero_s">Numero de sécurité sociale</label>
                <input
                  type="number"
                  id="numero_s"
                  defaultValue={data.numero_securite}
                  ref={numeroSecuriteRef}
                />
              </div>

              <div className="input_conteneur">
                <label htmlFor="dateNaissance">Date de naissance</label>
                <div className="dates">
                  <input
                    type="date"
                    id="dateNaissance"
                    onChange={(e) => setDateNaissance(e.target.value)}
                     
                  />
                  <input
                    type="text"
                    id="dateAffiche"
                    readOnly={true}
                    ref={dateNaissanceRef}
                    defaultValue={
                      !dateNaissance
                        ? new Date(data.date_naissance).toLocaleDateString()
                        : new Date(dateNaissance).toLocaleDateString()
                    }
                  />
                </div>
              </div>

              <div className="input_conteneur">
                <label htmlFor="dateEntre">Date d'entrée</label>
                <div className="dates">
                  <input
                    type="date"
                    id="dateEntre"
                    onChange={(e) => setDateEntre(e.target.value)}
                    
                  />
                  <input
                    type="text"
                    readOnly={true}
                    id="dateAffiche"
                    ref={dateEntreRef}
                    defaultValue={
                      !dateEntre
                        ? new Date(data.date_entre).toLocaleDateString()
                        : new Date(dateEntre).toLocaleDateString()
                    }
                  />
                </div>
              </div>

              <div className="input_conteneur">
                <label htmlFor="dateSortie">Date de sortie</label>
                <div className="dates">
                  <input
                    type="date"
                    id="dateSortie"
                    onChange={(e) => setDateSortie(e.target.value)}
                     
                  />
                  <input
                    type="text"
                    readOnly={true}
                    id="dateAffiche"
                    ref={dateSortieRef}
                    
                     defaultValue={
                      !dateSortie
                        ?   afficherDateSortie()
                        : new Date(dateSortie).toLocaleDateString()
                    }
                  />
                </div>
              </div>

              <div className="input_conteneur">
                <label htmlFor="specialite">Spécialité</label>
                <select name="specialite" id="specialite" ref={specialiteRef}>
                  <option value="">Spécialité</option>
                </select>
              </div>
              <div className="input_conteneur">
                <label htmlFor="etat_civile">Etat civile</label>
                <select name="etat_civile" id="etat_civile" ref={etatCivilRef}>
                  <option value={data.etat_civile}>Célibataire</option>
                  <option value="Marié">Marié</option>
                  <option value="Divorcé">Divorcé</option>
                </select>
              </div>

              <div className="input_conteneur">
                <label htmlFor="observation">Observation</label>
                <textarea
                  id="observation"
                  name="observation"
                  defaultValue=" aucune observation"
                  rows="2"
                  ref={observationRef}
                />
              </div>

              <div className="input_conteneur">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type={afficherMdp ? "text" : "password"}
                  defaultValue={data.mot_passe}
                  ref={passwordRef}
                />
                 <svg
              onClick={(e) => setafficherMdp(!afficherMdp)}
              width={20}
              height={20}
              fill="none"
              stroke="#646464"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.984 5.25c-3.653 0-7.401 2.115-10.351 6.344a.75.75 0 0 0-.013.833c2.267 3.548 5.964 6.323 10.364 6.323 4.352 0 8.125-2.783 10.397-6.34a.757.757 0 0 0 0-.819C20.104 8.076 16.303 5.25 11.984 5.25Z" />
              <path d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
            </svg> 
              </div>
            </div>

            <div className="btn">
              <button type="submit">Enregistrer</button>
              <button  onClick={(e)=>navigation()} >Annuler</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfilMP;
