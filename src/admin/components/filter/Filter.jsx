import React from "react";
import "../../../style/adminStyle/table/filter.css"
import { Link, useLocation } from "react-router-dom";


function Filter({specialite,speciality,setSpecialite,nomBtn}) {
 
const location = useLocation();
const navigation = location.pathname==="/admin/medecin"? "/admin/medecin/ajouter":"/admin/personnel/ajouter"

  return (
    <div className="entete">
      <select
        value={specialite}
        name="filter"
        onChange={(e) => setSpecialite(e.target.value)}
      >
        <option value="">Tout</option>
        {speciality.map((special, index) => (
          <option key={`${special}-${index}`} value={special}>
            {special}
          </option>
        ))}
      </select>
      <Link to={navigation} className="ajout">
        {nomBtn}
        <svg
          width={30}
          height={30}
          fill="none"
          stroke="#637381"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z" />
          <path d="M12 8.25v7.5" />
          <path d="M15.75 12h-7.5" />
        </svg>
      </Link>
    </div>
  );
}

export default Filter;
