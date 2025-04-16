import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../mycss/mainpage.module.css";

function Movie({ id, coverImg, title, rating }) {
  const rate = Math.round(rating * 10);
  return (
    <div className={styles.container}>
      <Link to={`/movie/${id}`} className={styles.link}>
        <img src={coverImg} alt={title} className={styles.poster} />
        <div className={styles.title}>
          <span style={{ width: "70%" }}>{title}</span>
          <span style={{ width: "30%", textAlign: "right" }}>
            {rate >= 80 ? "🟢" : rate >= 50 ? "🟡" : "🔴"} {rate}
          </span>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
