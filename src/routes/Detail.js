import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
    };

    getMovie();
  }, [id]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Detail</h1>
      <span>{movie.title}</span>
    </div>
  );
}

export default Detail;
