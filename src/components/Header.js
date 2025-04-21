import { Link, useNavigate } from "react-router-dom";
import style from "../mycss/header.module.css";
import { useState } from "react";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={style.main_bar}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" className={style.title}>
          MovieOne
        </Link>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="영화/시리즈 검색"
            className={style.search_input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={style.search_button}
            onClick={handleSearch}
            type="button"
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
