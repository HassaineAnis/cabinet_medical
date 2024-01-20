import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/connexion/login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthoContext } from "../util/context/Context";

const Login = () => {
  const [afficherPassword, setAfficher] = useState(false);
  const { login } = useContext(AuthoContext);

  const [roleVal, setRoleVal] = useState(null);
  const [userId, setUserId] = useState(null);
  const passwordRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [users, setUser] = useState([]);
  const [erreur, setErreur] = useState(false);

  const routes = (role) => {
    if (role === "Médecin") {
      return "/medecin";
    }
    if (role === "ADMIN") {
      return "/admin";
    }
    if (role === "LaborantinAM") {
      return "/laboAM";
    }
    if (role === "Surveillant") {
      return "/surveillant";
    }
    if (role === "Réceptionniste") {
      return "/receptionniste";
    }
    if (role === "LaborantinACP") {
      return "/laboACP";
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/users/tout");

        const users = await response.json();

        setUser(users);
      } catch (e) {
        console.log("erreur!!!", e);
        setErreur(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const roles = users
    .reduce(
      (acc, curent) =>
        acc.includes(curent.role) ? acc : acc.concat(curent.role),
      []
    )
    .sort();

  const navigate = useNavigate();

  function navigation(lien) {
    navigate(lien);
  }

  const seConnecter = async (e) => {
    e.preventDefault();
    const body = {
      password: passwordRef.current.value,
      _id: userId,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify(body),

        headers: { "Content-Type": "application/json" },
      });

      const token = await response.json();
      if (response.ok) {
        notificationReussite();
        login(token);

        navigation(`${routes(roleVal)}`);
      } else {
        console.log("erreur de l'authontification");
        notificationEchec();
      }
    } catch (e) {
      console.log("Erreur lors de la requête", e);
    }
  };

  const notificationReussite = () => {
    toast.success("authentification reussit!!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const notificationEchec = () => {
    toast.error("Mot de passe incorrecte!!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  console.log(roleVal);
  return (
    <div className="login">
      <ToastContainer />
      <form className="form" onSubmit={(e) => seConnecter(e)}>
        <p className="form-title">Connexion</p>
        <div className="input-container">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setRoleVal(e.currentTarget.value)}
            required
          >
            <option value="">------</option>
            {roles &&
              roles.map((role, index) => (
                <option key={`${index}-${role}`} value={role}>
                  {role}
                </option>
              ))}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="nom">Nom /Prénom</label>
          <select
            name="nom"
            id="nom"
            onChange={(e) => setUserId(e.currentTarget.value)}
            required
          >
            <option value="">-------</option>
            {roleVal
              ? users
                  .filter((user) => user.role === roleVal)
                  .map((user) => (
                    <option key={`${user._id}`} value={user._id}>
                      {" "}
                      {`${user.nom} ${user.prenom}`}
                    </option>
                  ))
              : null}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="password">Mot de passe</label>
          <input
            placeholder="Enter password"
            id="password"
            type={afficherPassword ? "text" : "password"}
            ref={passwordRef}
            required
          />

          <span onClick={(e) => setAfficher(!afficherPassword)}>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
