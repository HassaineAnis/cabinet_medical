import { createContext, useState } from "react";
import socket from "../../socket/Socket";
import { format } from "date-fns";

export const AuthoContext = createContext();
export const AuthoProvider = ({ children }) => {
  const login = (userData) => {
    const jeton = {
      autho: true,
      role: userData.role,
      nom: userData.nom,
      prenom: userData.prenom,
      id: userData.userId,
      photo: userData.photo,
    };
    sessionStorage.setItem("user", JSON.stringify(jeton));
    socket.connect();
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
    <RechargeContext.Provider value={{ recharge, setRecharge }}>
      {children}
    </RechargeContext.Provider>
  );
};

export const DocumentContext = createContext();
export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  console.log(documents);

  return (
    <DocumentContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const ConsultationContext = createContext();
export const ConsultationProvider = ({ children }) => {
  const [symptome, setSymptome] = useState([]);
  const [fichier, setFichier] = useState([]);
  const [tension, setTension] = useState("");
  const [poid, setPoid] = useState("");
  const [glycemie, setGlycemie] = useState("");
  const [respiration, setRespiration] = useState("");

  const [montant, setMontant] = useState("");
  const [diagnostic, setDiagnostic] = useState("");

  return (
    <ConsultationContext.Provider
      value={{
        symptome,
        setSymptome,
        fichier,
        setFichier,
        tension,
        setTension,
        poid,
        setPoid,
        glycemie,
        setGlycemie,
        respiration,
        setRespiration,
        montant,
        setMontant,
        diagnostic,
        setDiagnostic,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const BpoContext = createContext();
export const BpoProvider = ({ children }) => {
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [tempProth, setTemp] = useState("");
  const [taux, setTaux] = useState("");
  const [inr, setInr] = useState("");
  const [tck, setTck] = useState("");

  const [service, setService] = useState("Interne");
  const [hiv, setHiv] = useState("");
  const [hbs, setHbs] = useState("");
  const [hcv, setHcv] = useState("");
  const [gs, setGs] = useState("");
  const [rhesus, setRhesus] = useState("");
  const [uree, setUree] = useState("");
  const [creatinemie, setCreatinemie] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bw, setBw] = useState("");

  const [dosage1, setDosage1] = useState("");
  const [dosage2, setDosage2] = useState("");
  const [dosage3, setDosage3] = useState("");
  const [proteinurie, setProteinurie] = useState("");
  const [diurese, setDiurese] = useState("");
  const [ferSerrique, setFerSerrique] = useState("");
  const [crp, setCrp] = useState("");
  const [coombs, setCoombs] = useState("");
  const [calcuim, setCalcuim] = useState("");
  const [bilirubineSangT, setBilirubineSangT] = useState("");
  const [bilirubineSangD, setBilirubineSangD] = useState("");
  const [bilirubineUrineT, setBilirubineUrineT] = useState("");
  const [bilirubineUrineD, setBilirubineUrineD] = useState("");
  const [phosphore, setPhosphore] = useState("");
  const [magnesium, setMagnesium] = useState("");
  const [rai, setRai] = useState("");
  const [ft3, setFt3] = useState("");
  const [ft4, setFt4] = useState("");
  const [toxoplasmose, setToxoplasmose] = useState("");
  const [tsh, setTsh] = useState("");
  const [fibrinogene, setFibrinogene] = useState("");
  const [aslo, setAslo] = useState("");
  const [latex, setLatex] = useState("");
  const [wrose, setWrose] = useState("");
  const [vitamineD, setVitamineD] = useState("");
  const [psat, setPsat] = useState("");
  const [inograme, setInorgame] = useState("");
  const [na, setNa] = useState("");
  const [rubeole, setRubeole] = useState("");
  const [prolactine, setProlactine] = useState("");
  const [oestradiol, setOestradiol] = useState("");
  const [ferritine, setFerritine] = useState("");
  const [hcg, setHcg] = useState("");
  const [seuilSensibilite, setSeuilSensibilite] = useState("");
  const [k, setK] = useState("");

  return (
    <BpoContext.Provider
      value={{
        k,
        setK,
        inograme,
        setInorgame,
        vitamineD,
        setVitamineD,
        psat,
        setPsat,
        na,
        setNa,
        rubeole,
        setRubeole,
        prolactine,
        setProlactine,
        oestradiol,
        setOestradiol,
        ferritine,
        setFerritine,
        seuilSensibilite,
        setSeuilSensibilite,
        hcg,
        setHcg,
        fibrinogene,
        setFibrinogene,
        wrose,
        setWrose,
        latex,
        setLatex,
        aslo,
        setAslo,

        ft3,
        tsh,
        setTsh,
        ft4,
        setFt3,
        setFt4,
        toxoplasmose,
        setToxoplasmose,
        date,
        setDate,
        tempProth,
        setTemp,
        taux,
        setTaux,
        inr,
        setInr,
        tck,
        setTck,
        service,
        setService,
        hiv,
        setHiv,
        hbs,
        setHbs,
        hcv,
        setHcv,
        gs,
        setGs,
        rhesus,
        setRhesus,
        uree,
        setUree,
        creatinemie,
        setCreatinemie,
        glucose,
        setGlucose,
        bw,
        setBw,

        proteinurie,
        setProteinurie,
        ferSerrique,
        setFerSerrique,
        coombs,
        setCoombs,
        bilirubineSangT,
        setBilirubineSangT,
        bilirubineSangD,
        setBilirubineSangD,
        phosphore,
        setPhosphore,
        calcuim,
        setCalcuim,
        crp,
        setCrp,
        rai,
        setRai,
        magnesium,
        setMagnesium,
        diurese,
        setDiurese,
        bilirubineUrineD,
        setBilirubineUrineD,
        bilirubineUrineT,
        setBilirubineUrineT,
        dosage2,
        setDosage2,
        dosage1,
        setDosage1,
        dosage3,
        setDosage3,
      }}
    >
      {children}
    </BpoContext.Provider>
  );
};
