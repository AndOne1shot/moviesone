import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../mycss/searchresult.module.css"; // CSS 모듈 경로에 맞게 수정

function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) return;
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
            query
          )}&language=ko-KR`
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        setError("검색 중 오류가 발생했습니다.");
      }
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  if (!query) return <div>검색어를 입력해주세요.</div>;
  if (loading) return <div>검색 중...</div>;
  if (error) return <div>{error}</div>;

  // 영화와 TV 시리즈만 필터링
  const filteredResults = results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );

  return (
    <div>
      <h2 className={styles.result}>"{query}" 검색 결과</h2>
      <div className={styles.flex_container}>
        {filteredResults.length === 0 ? (
          <div className={styles.no_result}>검색 결과가 없습니다.</div>
        ) : (
          filteredResults.map((item) => {
            const id = item.id;
            const linkType = item.media_type;
            const title = item.title || item.name || "제목 없음";
            const coverImg = item.poster_path
              ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image";
            const rate = item.vote_average
              ? Math.round(item.vote_average * 10)
              : 0;

            return (
              <div className={styles.container} key={`${linkType}-${id}`}>
                <Link to={`/${linkType}/${id}`} className={styles.link}>
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
          })
        )}
      </div>
    </div>
  );
}

export default SearchResult;
