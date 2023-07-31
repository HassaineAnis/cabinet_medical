import React, { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../../style/loader/loader.css"

const AjouterConge = () => {
   const navigate =useNavigate()
    const navigation = () => {
        navigate(-1);
      };

      const [isLoading, setLoading] = useState(false);
    const [fetchData, setFetch] = useState([]);
    const [erreur, setErreur] = useState(false);

      const [service,setService]  = useState("")
      const employe = useRef(null)
      const dateSortieRef = useRef(null)
      const remplacantRef = useRef(null)

      useEffect(() => {
        
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const response = await fetch(service ==="personnel"? "http://localhost:3000/api/personnel":`http://localhost:3000/api/users/tout`);
    
            const users = await response.json();
           // users.sort((a, b) => new Date(b.date) - new Date(a.date));
           
            setFetch(users);
          } catch (e) {
            console.log("erreur!!!", e);
            setErreur(true);
          } finally {
            setLoading(false);
           
    
            
          }
        };
  
        
    
        fetchUsers();
  
        
      }, [service] ); 
      console.log(fetchData)
      if(erreur){
        return ( <div className="user">Erreur de chargement </div>)
      }
    return (
        
        <div className="container_form">
    
        <h2>Ajouter un Congé</h2>
        <hr />
        {isLoading? <div className="spinner"  ></div>:
        
        (
            <form    >
          
   
            <div className="input_section">
              <div className="input_conteneur">
                <label htmlFor="service">Service:</label>
                <select name="service" id="service" required onChange={(e)=>setService(e.target.value)} value={service}>
                  <option value="">-- Choisissez le service --</option>
                  <option value="ADMIN">Administration</option>
                  <option value="Médecin">Médecin</option>
                  <option value="personnel">Personnel</option>
                </select>
              </div>

              {service === "personnel" ?
              (
                <div className="input_conteneur">
                <label htmlFor="nom">Nom/Prénom</label>
                <select name="nom" id="nom" required>
                  <option value="">-- Choisissez une personne --</option>
                  {fetchData.map((element,index)=>(
                    <option value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
            
              </div>):
              (
                <div className="input_conteneur">
                <label htmlFor="nom">Nom/Prénom</label>
                <select name="nom" id="nom" required>
                  <option value="">-- Choisissez une personne --</option>
                  {fetchData.filter(filtre=>filtre.role===service).map((element,index)=>(
                    <option value={element._id}>{element.nom} {element.prenom}</option>
                  ))}
                </select>
            
              </div>
              )

              

              }
  
            
              <div className="input_conteneur">
                <label htmlFor="date">Date De Sortie</label>
                <input type="date" id="date"   required />
              </div>
    
              
    
              
     
    
              <div className="input_conteneur">
                <label htmlFor="jour">Nombre de jours</label>
                <input
               
                  type="text"
                  id="jour"
               
                  pattern="[0-9]*"
                  title="il doit contenir des nombres"
                  required
                  placeholder="Ex: 25"
                />
              </div>
  
              <div className="input_conteneur">
                <label htmlFor="remplacant">Remplaçants</label>
                <select name="remplacant" id="remplacant" required>
                  <option value="">-- Choisissez un remplaçant --</option>
                </select>
              </div>
              
    
              <div className="input_conteneur">
                <label htmlFor="entre">Date d'entrée</label>
                <input
                  type="text"
                  id="entre"
                  readOnly={true}
                  
             
                   
                  
                />
              </div>
              
         
               
              
               
             
    
              
            </div>
            <div className="btn">
              <button type="submit">Enregitrer</button>
             
              <span onClick={navigation}>Annuler</span>
            </div>
          </form>

        )}
       
      </div>
    );
};

export default AjouterConge;