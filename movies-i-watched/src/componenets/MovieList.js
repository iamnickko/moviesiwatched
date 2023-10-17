import classes from "./MovieList.module.css";
import { useEffect } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "./UI/Card";
import Button from "./UI/Button";

const MoviesList = () => {
  const { movies, dispatch } = useMoviesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMovies = async () => {
      if (!user) {
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/movies`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_MOVIES", payload: json });
      }
    };
    fetchMovies();
  }, [dispatch, user]);

  return (
    <>
      {(!movies || movies.length === 0) && (
        <p className={classes.empty}>You've not recorded any movies yet.</p>
      )}
      {movies &&
        movies.map((movie) => (
          <Card className={classes.card} key={movie._id}>
            <article className={classes.article}>
              <h2 className={classes.title}>{movie.title}</h2>
              <h5 className={classes.rating}>Rating: {movie.rating} / 10</h5>
              <p>Comments: {movie.comments}</p>
              <Button className={classes.button}>
                <Link to={`/${movie._id}`}>Edit</Link>
              </Button>
            </article>
          </Card>
        ))}
    </>
  );
};

export default MoviesList;
