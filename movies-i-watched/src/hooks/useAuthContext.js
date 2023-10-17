import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

