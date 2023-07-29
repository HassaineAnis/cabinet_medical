import { createContext, useState } from "react";
import socket from "../../socket/Socket";
 

export const AuthoContext = createContext();
export const AuthoProvider = ({ children }) => {
  
  const login = (userData) => {
    const jeton = {
      autho: true,
      role: userData.role,
      nom: userData.nom,
      prenom: userData.prenom,
      id: userData.userId,
      photo: userData.photo
    };
    sessionStorage.setItem("user", JSON.stringify(jeton));
    socket.connect()
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    //socket.disconnect()
  };

  const authContextValue = {
    login,
    logout,
  };
  return (
    <AuthoContext.Provider value={authContextValue}>
      {children}
    </AuthoContext.Provider>
  );
};


export const RechargeContext = createContext();

export const RechargeProvider = ({ children }) => {
  const [recharge, setRecharge] = useState(false);

  return (
    <RechargeContext.Provider value={{ recharge,setRecharge }}>
      
      {children}
    </RechargeContext.Provider>
  );
};

export const DocumentContext = createContext();
export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments]=useState([]) ;
  console.log(documents)
 
  return(
    <DocumentContext.Provider value={{ documents , setDocuments}}>
      {children}
      </DocumentContext.Provider>
  )
}

export const ConsultationContext = createContext();
export const ConsultationProvider = ({ children }) => {
  const [symptome,setSymptome] = useState([])
  const [fichier,setFichier]= useState([])
  const [tension,setTension] = useState("") 
  const [poid,setPoid] = useState("")
  const [glycemie,setGlycemie] =useState("")
  const [respiration,setRespiration] = useState("")

  const [montant,setMontant] = useState("")
  const [diagnostic,setDiagnostic] = useState("") 
 
 
  return(
    <ConsultationContext.Provider value={{symptome,setSymptome,fichier,setFichier,tension,setTension,poid,setPoid,glycemie,setGlycemie,respiration,setRespiration,montant,setMontant,diagnostic,setDiagnostic}}>
      {children}
      </ConsultationContext.Provider>
  )
}
