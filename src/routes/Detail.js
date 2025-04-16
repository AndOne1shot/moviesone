import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../mycss/detailpage.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_cast=true`
        )
      ).json();
      setMovie(json.data.movie);
    };

    getMovie();
  }, [id]);

  if (!movie) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "white", fontSize: "40px", fontWeight: "600" }}>
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className={styles.detail_container}>
      <img
        src={movie.medium_cover_image}
        alt={movie.title}
        className={styles.poster}
      />
      <div style={{ width: "900px" }}>
        <span style={{ fontSize: "36px", fontWeight: "600", color: "white" }}>
          {movie.title} ({movie.year})
        </span>
        <div>
          {movie.cast && movie.cast.length > 0 ? (
            <ul>
              {movie.cast.map((actor) => (
                <li
                  key={actor.imdb_code || actor.name}
                  style={{ color: "white", marginBottom: "8px" }}
                >
                  <strong>{actor.name}</strong> as {actor.character_name}
                </li>
              ))}
            </ul>
          ) : (
            <span style={{ color: "gray" }}>
              No cast information available.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail;
