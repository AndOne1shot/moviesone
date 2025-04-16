import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../mycss/mainpage.module.css";

function Movie({ id, coverImg, title, rating }) {
  return (
    <div className={styles.container}>
      <Link to={`/movie/${id}`} className={styles.link}>
        <img src={coverImg} alt={title} className={styles.poster} />
        <div className={styles.title}>
          <span style={{ width: "75%" }}>{title}</span>
          <span style={{ width: "20%", textAlign: "right" }}>
            {rating >= 8 ? "🟢" : rating >= 5 ? "🟡" : "🔴"} {rating}
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
