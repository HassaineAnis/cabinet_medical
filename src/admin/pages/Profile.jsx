import React, { useRef, useState,useEffect } from "react";
import "../../style/adminStyle/profil.css";
import adminPhoto from "../../assets/admin.png";
import { ToastContainer} from "react-toastify";
 import Notification from "../../util/Notifiation";
import Modal from "react-modal";
 import "../../style/loader/loader.css"
import {  useNavigate } from "react-router-dom";
import useModal from "../../util/hooks/UseModal";

Modal.setAppElement("#root");

const Profile = () => {
  const dataString = sessionStorage.getItem("user");
  const  data = JSON.parse(dataString); 
 

  const navigate = useNavigate()

  const nomRef = useRef(null);
  const prenomRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const photoRef = useRef("");
  const [imageUrl, setImageUrl] = useState(null);
  
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const [fetchData, setFetch] = useState([]);
  const [erreur, setErreur] = useState(false);
  const [recharge,setRecharge] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/profile/${data.id}`
        );

        const user = await response.json();
         
        setFetch(user);
        const jeton = {
          id : user._id,
          nom: user.nom,
          prenom : user.prenom,
          autho:true,
          photo:user.photo,
          role:user.role
        }
        sessionStorage.setItem('user',JSON.stringify(jeton))
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
        setRecharge(false)
        
         
      }
    };

    
    fetchUsers();
  }, [recharge]);
   

  
  const navigation = ()=>{
    navigate(-1)

  }

  const ajouterPhoto = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = (e) => {
    setImageUrl(null);
    photoRef.current.value = null;
    const tabInfo = {...fetchData}
    tabInfo.photo = ""
    setFetch(tabInfo)
     
  };

  const verifierData = (e) => {
    
    e.preventDefault();
      console.log("annuler")
     if (!nomRef.current.value || !prenomRef.current.value) {
      Notification.echec("Veuillez remplir tous les champs!");
      return;
    }
    if (passwordRef.current.value) {
      if (passwordRef.current.value !== "admin") {
        if( passwordRef.current.value !== confirmPasswordRef.current.value){
          Notification.echec("Les mots de passe ne correspondent pas!");
        }
        
        return;
      }
    }
     openModal()
  };

  const modifierProfile=async()=>{
    closeModal()
    const formaData = new FormData();
    formaData.append("nom",nomRef.current.value)
    formaData.append("prenom",prenomRef.current.value)
    formaData.append("password",passwordRef.current.value)
    if(photoRef.current.files[0]){
      formaData.append("photo", photoRef.current.files[0]);
       
    }else{ 
      formaData.append("photo",fetchData.photo);
     
    }
    //envoyer les nouvelle données 
  
    try {
      const response = await fetch(`http://localhost:3000/api/users/${data.id}`, {
        method:"PUT",
        body: formaData,
      });
    
      if (response.ok) {
        Notification.reussite("Profile modifier avec succès.");
      //  formulaireRef.current.reset();
      setRecharge(true);
    
         
      } else {
        const erreurData = await response.json();
        Notification.echec(erreurData.error);

        console.error(
          "Une erreur s'est produite lors de la mise à jour du profil. Veuillez réessayer."
        );
      }
    } catch (error) {
      Notification.echec(
        "La requête a échoué. Veuillez vérifier votre connexion et réessayer."
      );
    }

  }
  const afficherPhoto = ()=>{
    if(fetchData.photo===""){
      return adminPhoto
 
 }else{
   return fetchData.photo
 }

    };


    if(erreur){
      return (
        <div className="profile">

          <h2>Erreur de chargement</h2>
        </div>
      )
    }
  

  return (
    <div className="profile">
      <ToastContainer />
      {isLoading? ( <div className="spinner"></div> ) : (
         <div className="form_container">
         <form onSubmit={(e) => verifierData(e)}>
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
                 ref={photoRef}
                 onChange={(e) => ajouterPhoto(e)}
               />
             </div>
             <button type="button" onClick={(e) => resetPhoto(e)}>Reset</button>
           </div>
           <div className="info_profil">
             <div className="input_conteneur">
               <label htmlFor="nom">Nom</label>
               <input
                 type="text"
                 id="nom"
                 ref={nomRef}
                 placeholder={fetchData.nom}
                 defaultValue={fetchData.nom}
                 pattern="[A-Za-z]{3,}"
                 title="Le nom doit contenir au moins 3 caractères alphabétiques."
                 required
               />
             </div>
 
             <div className="input_conteneur">
               <label htmlFor="prenom">Prénom</label>
               <input
                 type="text"
                 id="prenom"
                 placeholder={fetchData.prenom}
                 ref={prenomRef}
                 defaultValue={fetchData.prenom}
                 pattern="[A-Za-z]{3,}"
                 title="Le prenom doit contenir au moins 3 caractères alphabétiques."
                 required
               />
             </div>
 
             <div className="input_conteneur">
               <label htmlFor="password">Password</label>
               <input
                 type="password"
                 id="Password"
                 defaultValue={fetchData.password}
                 ref={passwordRef}
                // pattern="^(?=.*\d)(?=.*[a-z]).{5,}$"
                 title="Le mot de passe doit contenir au moins 5 caractères, dont au moins une lettre minuscule et un chiffre."
               />
             </div>
 
             <div className="input_conteneur">
               <label htmlFor="confirmPassword">Confime Password</label>
               <input
                 type="password"
                 id="confirmPassword"
                 ref={confirmPasswordRef}
               />
             </div>
           </div>
        
           <div className="btn">
             <button type="submit" >Enregitrer</button>
             <span onClick={navigation} >Annuler</span>
           </div>
          
         </form>
         <Modal
             isOpen={modalIsOpen}
             onRequestClose={closeModal}
             className="custom_modal"
             style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" ,zIndex:"2" } }}
           >
             <p> Voulez-vous vraiment enregistré ces modifications? </p>
             <div className="repense">
               <button onClick={modifierProfile}>OUI</button>
               <button onClick={closeModal}>NON</button>
             </div>
           </Modal>
       </div>

      )}
      
    </div>
  );
};

export default Profile;
