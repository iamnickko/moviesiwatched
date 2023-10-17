import { useContext } from "react";
import { MovieContext } from "../store/MovieContext";

export const useMoviesContext = () => {
  const context = useContext(MovieContext);
  return context;
};
