import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "../mycss/mainpage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
  };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Slider {...settings} className={styles.flex_container}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <Movie
                id={movie.id}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                genres={movie.genres}
                rating={movie.rating}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Home;
