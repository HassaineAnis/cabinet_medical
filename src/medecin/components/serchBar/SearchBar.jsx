import React from "react";
import "../../../style/medecinStyle/searchBar/searchBar.css"

const SearchBar = ({  onSearchChange }) => {
  return (
    <div className="recherche">
      <input
        type="text"
        placeholder="Rechercher..."
      //  value={searchTerm}
        onChange={onSearchChange}
      />
      <svg
        width={25}
        height={25}
        fill="darkgreen"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m21.407 19.753-4.41-4.41a8.148 8.148 0 0 0 1.633-4.903c0-4.516-3.674-8.19-8.19-8.19s-8.19 3.674-8.19 8.19 3.674 8.19 8.19 8.19a8.148 8.148 0 0 0 4.902-1.633l4.41 4.41a1.171 1.171 0 0 0 1.655-1.654ZM4.59 10.44a5.85 5.85 0 1 1 5.85 5.85 5.857 5.857 0 0 1-5.85-5.85Z" />
      </svg>
    </div>
  );
};

export default SearchBar;
