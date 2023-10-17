import classes from "./NewMovieForm.module.css";
import { useRef } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "./UI/Card";
import Button from "./UI/Button";

const NewMovieForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useMoviesContext();
  const navigate = useNavigate();
  const enteredTitle = useRef();
  const enteredRating = useRef();
  const enteredComments = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const movie = {
      title: enteredTitle.current.value,
      rating: enteredRating.current.value,
      comments: enteredComments.current.value,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/movies/new`,
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "ADD_MOVIE", payload: json });
      navigate("/");
    }
  };

  return (
    <Card className={classes.card}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          name="title"
          id="title"
          ref={enteredTitle}
          required
        />
        <label htmlFor="rating">Rating /10</label>
        <input
          type="number"
          step={1}
          max={10}
          min={0}
          name="rating"
          id="rating"
          ref={enteredRating}
          required
        />
        <label htmlFor="comments">Comments</label>

        <textarea
          name="comments"
          cols={60}
          rows={8}
          className={classes.textarea}
          id="comments"
          ref={enteredComments}
        />

        <Button className={classes.button}>Movie Watched</Button>
      </form>
    </Card>
  );
};

export default NewMovieForm;
