import React from "react";
import "../../../style/adminStyle/table/pagination.css";

function Pagination({ pageActuel, totalPage, cliqueAvancer }) {
  return (
    <div className="pagination">
      <svg
        onClick={() =>
          cliqueAvancer(pageActuel !== 1 ? pageActuel - 1 : pageActuel)
        }
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        stroke="#637381"
        viewBox="0 0 512 512"
      >
        <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z" />
      </svg>

      <span>
        {pageActuel} / {totalPage}
      </span>
      <svg
        className="btn_avancer"
        onClick={() =>
          cliqueAvancer(
            totalPage >= pageActuel + 1 ? pageActuel + 1 : pageActuel
          )
        }
        width={25}
        height={25}
        stroke="#637381"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z" />
      </svg>
    </div>
  );
}

export default Pagination;
