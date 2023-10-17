import classes from "./Welcome.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
const Welcome = () => {
  const { user } = useAuthContext();
  if (!user) {
    return
  }
  const user_name = user.email.split("@")[0];

  return (
    <div className={classes.contents}>
      {user && <h2>Welcome back, {user_name} </h2>}
    </div>
  );
};

export default Welcome;
