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
 
  return(
    <DocumentContext.Provider value={{ documents , setDocuments}}>
      {children}
      </DocumentContext.Provider>
  )
}