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

export const NavetteContext = createContext();
export const NavetteProvider = ({ children }) => {
  const [afficherFiche, setAfficherFiche] = useState(false);
  const [designation, setDesignation] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [dateEntre, setdateEntre] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const [medicament, setMedicament] = useState("");
  const [maternite, setMaternite] = useState(0);
  const [bloc, setBloc] = useState(0);
  const [hospital, setHospital] = useState(0);
  return (
    <NavetteContext.Provider
      value={{
        afficherFiche,
        setAfficherFiche,
        designation,
        setDesignation,
        nom,
        setNom,
        prenom,
        setPrenom,
        age,
        setAge,
        diagnostic,
        setDiagnostic,
        dateEntre,
        setdateEntre,
        dateSortie,
        setDateSortie,
        medicament,
        setMedicament,
        maternite,
        setMaternite,
        bloc,
        setBloc,
        hospital,
        setHospital,
      }}
    >
      {children}
    </NavetteContext.Provider>
  );
};

export const SurveillanceContext = createContext();

export const SurveillanceProvider = ({ children }) => {
  const [documentData, setDocumentData] = useState([]);
  const [purfusions, setPurfusions] = useState({});
  const [date, setDate] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [chirurgien, setChirurgien] = useState("");
  const [intervention, setIntervention] = useState("");
  const [reanimateur, setReanimateur] = useState("");
  const [heure, setHeure] = useState("");
  const [groupage, setGroupage] = useState("");
  const [afficherFiche, setAfficher] = useState(false);

  return (
    <SurveillanceContext.Provider
      value={{
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
      }}
    >
      {children}
    </SurveillanceContext.Provider>
  );
};

export const SurveilleBabyContext = createContext();

export const SurveilleBabyProvider = ({ children }) => {
  const [nne, SetNne] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [sexe, setSexe] = useState("");
  const [accouchement, setAccouchement] = useState("");
  const [couveuse, setCouvveuse] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [groupage, setGroupage] = useState("");
  const [documentData, setDocumentData] = useState([]);
  const [antiD, setAntiD] = useState("");
  const [afficherFiche, setAfficher] = useState(false);

  return (
    <SurveilleBabyContext.Provider
      value={{
        nne,
        SetNne,
        date,
        setDate,
        heure,
        setHeure,
        sexe,
        setSexe,
        accouchement,
        setAccouchement,
        couveuse,
        setCouvveuse,
        nom,
        setNom,
        prenom,
        setPrenom,
        groupage,
        setGroupage,
        documentData,
        setDocumentData,
        antiD,
        setAntiD,
        afficherFiche,
        setAfficher,
      }}
    >
      {children}
    </SurveilleBabyContext.Provider>
  );
};

export const NaissanceContext = createContext();
export const NaissanceProvider = ({ children }) => {
  const [numero, setNumero] = useState("");
  const [acteN, setActeN] = useState("");
  const [grosseLettre, setGrosseLettre] = useState("");
  const [lanDeuxMille, setLanDeuxMille] = useState("");
  const [dateMariage, setDateMariage] = useState("");
  const [lfNumero, setLfNumero] = useState("");
  const [du, setDu] = useState("");
  const [heure, setHeure] = useState("");
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [minute, setMinute] = useState("");
  const [dame, setDame] = useState("");
  const [ageDame, setAgeDame] = useState("");
  const [lieuDame, setLieuDame] = useState("");
  const [professionDame, setProfessionDame] = useState("");
  const [epou, setEpou] = useState("");
  const [ageEpou, setAgeEpou] = useState("");
  const [lieuEpou, setLieuEpou] = useState("");
  const [professionEpou, setProfessionEpou] = useState("");
  const [domicile, setDomicile] = useState("");
  const [sexeEnfant, setSexeEnfant] = useState("");
  const [prenomEnfant, setPrenomEnfant] = useState("");
  const [dateDame, setDateDame] = useState("");
  const [dateEpou, setDateEpou] = useState("");

  return (
    <NaissanceContext.Provider
      value={{
        dateEpou,
        setDateEpou,
        dateDame,
        setDateDame,
        acteN,
        setActeN,
        lanDeuxMille,
        setLanDeuxMille,
        numero,
        setNumero,
        grosseLettre,
        setGrosseLettre,
        dateMariage,
        setDateMariage,
        lfNumero,
        setLfNumero,
        du,
        setDu,
        mois,
        setMois,
        jour,
        setJour,
        heure,
        setHeure,
        minute,
        dame,
        setDame,
        setMinute,
        ageDame,
        setAgeDame,
        lieuEpou,
        setLieuEpou,
        lieuDame,
        setLieuDame,
        professionDame,
        setProfessionDame,
        epou,
        setEpou,
        ageEpou,
        setAgeEpou,
        professionEpou,
        setProfessionEpou,
        domicile,
        setDomicile,
        sexeEnfant,
        setSexeEnfant,
        prenomEnfant,
        setPrenomEnfant,
      }}
    >
      {children}
    </NaissanceContext.Provider>
  );
};
