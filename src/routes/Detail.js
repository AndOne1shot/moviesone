import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../mycss/detailpage.module.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      // TMDB 상세+출연진+감독 정보 한 번에 요청
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits`;
      const res = await fetch(url);
      const data = await res.json();

      setMovie(data);

      // 감독 추출 (crew 중 job이 Director인 사람)
      if (data.credits && data.credits.crew) {
        const directorObj = data.credits.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorObj ? directorObj.name : "");
      }

      // 출연진(상위 10명만)
      if (data.credits && data.credits.cast) {
        setCast(data.credits.cast.slice(0, 10));
      }
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
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : ""
        }
        alt={movie.title}
        className={styles.poster}
      />
      <div style={{ width: "900px" }}>
        <span style={{ fontSize: "36px", fontWeight: "600", color: "white" }}>
          {movie.title} ({movie.release_date?.slice(0, 4)})
        </span>
        <div style={{ margin: "10px 0", color: "white" }}>
          <strong>감독:</strong> {director || "정보 없음"}
        </div>
        <div>
          <strong style={{ color: "white" }}>출연진:</strong>
          {cast && cast.length > 0 ? (
            <ul>
              {cast.map((actor) => (
                <li
                  key={actor.cast_id || actor.name}
                  style={{ color: "white", marginBottom: "8px" }}
                >
                  <strong>{actor.name}</strong> as {actor.character}
                </li>
              ))}
            </ul>
          ) : (
            <span style={{ color: "gray" }}>출연진 정보가 없습니다.</span>
          )}
        </div>
        <div style={{ color: "white", marginTop: "20px" }}>
          <strong>줄거리:</strong>
          <div>{movie.overview || "줄거리 정보가 없습니다."}</div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
