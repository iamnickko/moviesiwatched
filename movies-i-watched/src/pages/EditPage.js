import classes from "./EditPage.module.css";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "../componenets/UI/Card";
import Button from "../componenets/UI/Button";

const EditPage = () => {
  const { user } = useAuthContext();
  const { dispatch } = useMoviesContext();
  const movie = useLoaderData("edit-page");
  const [title, setTitle] = useState(movie.title);
  const [rating, setRating] = useState(movie.rating);
  const [comments, setComments] = useState(movie.comments);
  const [id] = useState(movie._id);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    const movie = {
      title: title,
      rating: rating,
      comments: comments,
      _id: id,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/movies/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      navigate("/");
    }
  };

  const onDeleteHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/api/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "DELETE_MOVIE", payload: json });
      navigate("/");
    }
  };

  return (
    <>
      <h1 className={classes.content}>Making Edits to: {movie.title}</h1>
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <label htmlFor="title">Movie Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            required
          />
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            min={0}
            max={10}
            step={1}
            value={rating}
            onChange={(event) => {
              setRating(event.target.value);
            }}
            required
          />
          <label htmlFor="comments">Comments</label>
          <textarea
            name="comments"
            id="comments"
            cols={60}
            rows={8}
            defaultValue={movie.comments}
            onChange={(event) => setComments(event.target.value)}
          />
          <input
            type="hidden"
            name="user_id"
            value={movie.user_id}
            id="user_id"
          />
          <input type="hidden" name="id" value={movie._id} id="id" />
          <Button className={classes.button}>Update Movie</Button>
        </form>
        {error && <div className={classes.error}>{error}</div>}
        <Button className={classes.delete} onClick={onDeleteHandler}>
          Delete
        </Button>
      </Card>
    </>
  );
};

export default EditPage;

export const loader = async ({ request, params }) => {
  const { id } = params;
  const user = JSON.parse(localStorage.getItem("user"));
  return fetch(`${process.env.REACT_APP_API_URI}/api/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};
