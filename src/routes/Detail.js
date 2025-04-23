import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../mycss/detailpage.module.css";

function Detail() {
  const { id, type } = useParams(); // type: 'movie' 또는 'series'
  const [item, setItem] = useState(null);
  const [director, setDirector] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getDetail = async () => {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const endpoint = type === "tv" ? "tv" : "movie";
      const url = `https://api.themoviedb.org/3/${endpoint}/${id}?api_key=${apiKey}&language=ko-KR&append_to_response=credits`;
      const res = await fetch(url);
      const data = await res.json();

      setItem(data);

      // 감독 추출
      if (data.credits && data.credits.crew) {
        let directorObj;
        if (type === "tv") {
          // TV 시리즈는 여러 명일 수 있음
          directorObj = data.credits.crew.filter(
            (person) => person.job === "Director"
          );
          setDirector(
            directorObj.length > 0
              ? directorObj.map((d) => d.name).join(", ")
              : ""
          );
        } else {
          directorObj = data.credits.crew.find(
            (person) => person.job === "Director"
          );
          setDirector(directorObj ? directorObj.name : "");
        }
      }

      // 출연진(상위 10명만)
      if (data.credits && data.credits.cast) {
        setCast(data.credits.cast.slice(0, 10));
      }
    };

    getDetail();
  }, [id, type]);

  if (!item) {
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
      <div
        className={styles.backdrop_img}
        style={{
          "--bg-url": item.backdrop_path
            ? `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})`
            : "none",
        }}
      >
        <img
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : ""
          }
          alt={type === "tv" ? item.name : item.title}
          className={styles.poster}
        />
        <div style={{ width: "900px" }}>
          <span style={{ fontSize: "36px", fontWeight: "600", color: "white" }}>
            {type === "tv" ? item.name : item.title} (
            {(item.first_air_date || item.release_date)?.slice(0, 4)})
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
                    <span>{actor.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <span style={{ color: "gray" }}>출연진 정보가 없습니다.</span>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          color: "white",
          marginTop: "20px",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        <strong style={{ fontSize: "24px" }}>줄거리</strong>
        <br />
        <br />
        <span>{item.overview || "줄거리 정보가 없습니다."}</span>
        <hr
          style={{
            marginTop: "30px",
            marginBottom: "30px",
            maxWidth: "1280px",
            width: "100%",
          }}
        />
        <ul className={styles.movie_info}>
          <li>
            <strong>장르</strong>
            <span>
              {item.genres && item.genres.length > 0
                ? item.genres.map((g) => g.name).join(", ")
                : "정보 없음"}
            </span>
          </li>
          <li>
            <strong>{type === "tv" ? "방영일" : "개봉일"}</strong>
            <span>
              {type === "tv" ? item.first_air_date : item.release_date}
            </span>
          </li>
          <li>
            <strong>러닝타임</strong>
            <span>
              {type === "series" ? item.episode_run_time : item.runtime}분
            </span>
          </li>
          <li>
            <strong>제작국가</strong>
            <span>
              {type === "tv"
                ? item.origin_country && item.origin_country.length > 0
                  ? item.origin_country.join(", ")
                  : "정보 없음"
                : item.production_countries &&
                  item.production_countries.length > 0
                ? item.production_countries.map((c) => c.name).join(", ")
                : "정보 없음"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Detail;
