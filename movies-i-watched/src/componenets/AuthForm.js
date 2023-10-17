import classes from "./AuthForm.module.css";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Card from "./UI/Card";
import Button from "./UI/Button";

const AuthForm = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get("mode") === "login";

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(null)
    const user = {
      email: email,
      password: password,
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URI}/auth/${
        isLoggingIn ? "login" : "register"
      }`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      navigate("/");
    }
  };

  return (
    <Card className={classes.card}>
      <h2>{isLoggingIn ? 'Login' : 'Register'}</h2>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <Button className={classes.button}>
          {isLoggingIn ? "Login" : "Register"}
        </Button>
      </form>
      {error && <div className={classes.error}>{error}</div>}
      <Link to={isLoggingIn ? "/auth?mode=register" : "/auth?mode=login"}>
        {isLoggingIn
          ? "New? Register an account"
          : "Already have an account? Login"}
      </Link>
    </Card>
  );
};

export default AuthForm;
