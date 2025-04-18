import style from "../mycss/header.module.css";

function Header() {
  return (
    <div className={style.main_bar}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className={style.title}>MovieOne</span>
        <div>asdasd</div>
      </div>
    </div>
  );
}

export default Header;
