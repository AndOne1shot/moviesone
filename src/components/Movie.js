import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../mycss/mainpage.module.css";

function Movie({ id, coverImg, title, rating }) {
  return (
    <Link to={`/movie/${id}`} className={styles.link}>
      <div className={styles.container}>
        <img src={coverImg} alt={title} className={styles.poster} />
        <div className={styles.title}>
          <span>{title}</span>
          <span>{rating}</span>
        </div>
      </div>
    </Link>
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
