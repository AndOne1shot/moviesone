import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../mycss/upcomemovie.module.css";

function UpcomeMovie({
  id,
  coverImg,
  title,
  release_date,
  linkType = "movie",
}) {
  const today = new Date();
  const target = new Date(release_date);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  console.log("오늘" + today);
  console.log("개봉일" + target);

  const d_day = Math.floor((target - today) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.container}>
      <Link to={`/${linkType}/${id}`} className={styles.link}>
        <div style={{ position: "relative" }}>
          <img src={coverImg} alt={title} className={styles.poster} />
          <div className={styles.d_day}>D-{d_day}</div>
        </div>
        <div className={styles.title}>
          <span>{title}</span>
          <span style={{ margin: "auto" }}>{release_date}</span>
        </div>
      </Link>
    </div>
  );
}

export default UpcomeMovie;
