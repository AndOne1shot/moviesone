import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "../mycss/mainpage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpcomeMovie from "../components/UpcomeMovie";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: "60px", // 원하는 높이만 지정
      }}
      onClick={onClick}
    >
      ▶
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: "60px", // 원하는 높이만 지정
      }}
      onClick={onClick}
    >
      ▶
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [upcomeMovies, setUpcomeMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const getMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`;
      const response = await fetch(url);
      const json = await response.json();
      setMovies(json.results);
    };

    const getSeries = async () => {
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=ko-KR&region=KR`;
      const response = await fetch(url);
      const json = await response.json();
      setSeries(json.results);
    };

    const getUpcomeMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=ko-KR&region=KR`;
      const response = await fetch(url);
      const json = await response.json();
      setUpcomeMovies(json.results);
    };

    Promise.all([getMovies(), getSeries(), getUpcomeMovies()]).then(() =>
      setLoading(false)
    );
  }, [apiKey]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div>
      {loading ? (
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
      ) : (
        <div className={styles.flex_container}>
          <div style={{ maxWidth: "1280px", width: "100%" }}>
            <span
              style={{ fontSize: "32px", color: "white", fontWeight: "600" }}
            >
              개봉예정 영화
            </span>
            <Slider {...settings} className={styles.flex_container}>
              {upcomeMovies
                .slice()
                .sort(
                  (a, b) => new Date(a.release_date) - new Date(b.release_date)
                )
                .map((upcomemovie) => (
                  <div key={upcomemovie.id}>
                    <UpcomeMovie
                      id={upcomemovie.id}
                      coverImg={
                        upcomemovie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${upcomemovie.poster_path}`
                          : ""
                      }
                      title={upcomemovie.title}
                      release_date={upcomemovie.release_date}
                    />
                  </div>
                ))}
            </Slider>
          </div>

          <span style={{ fontSize: "32px", color: "white", fontWeight: "600" }}>
            영화
          </span>
          <Slider {...settings} className={styles.flex_container}>
            {movies.map((movie) => (
              <div key={movie.id}>
                <Movie
                  id={movie.id}
                  coverImg={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : ""
                  }
                  title={movie.title}
                  genres={movie.genre_ids}
                  rating={movie.vote_average}
                />
              </div>
            ))}
          </Slider>

          <div>
            <span
              style={{ fontSize: "32px", color: "white", fontWeight: "600" }}
            >
              시리즈
            </span>
            <Slider {...settings} className={styles.flex_container}>
              {series.map((tv) => (
                <Movie
                  id={tv.id}
                  coverImg={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                      : ""
                  }
                  title={tv.name} // TV 시리즈는 title이 아니라 name
                  genres={tv.genre_ids}
                  rating={tv.vote_average}
                  linkType="series"
                />
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
