import classes from "./Header.module.css";
import Button from "./UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMoviesContext } from "../hooks/useMoviesContext";

const Header = () => {
  const { user, dispatch } = useAuthContext();
  const { dispatch: movieDispatch } = useMoviesContext();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    navigate("/auth?mode=login");
    localStorage.removeItem("user");
    movieDispatch({ type: "SET_MOVIES", payload: null });
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header className={classes.header}>
      <div className={classes.contents}>
        <h1>
          <Link to={"/"}>MoviesIWatched</Link>
        </h1>

        {user && (
          <Button className={classes.button}>
            <Link to={"/new"}>Add A Movie</Link>
          </Button>
        )}
        <div className={classes.user}>
          {user && (
            <Button className={classes.logout} onClick={onLogoutHandler}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
