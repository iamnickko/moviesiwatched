import { createContext, useReducer } from "react";

export const MovieContext = createContext();

export const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { movies: action.payload };
    case "ADD_MOVIE":
      const updatedMovies = [action.payload, ...state.movies];
      return { movies: updatedMovies };
    // case 'EDIT_MOVIE':
    //     const movieToUpdateIndex = state.movies.findIndex(movie=> movie._id === action.payload._id )
    //     const movieToUpdate = state.movies[movieToUpdateIndex]
        
    //     const updatedMovie = action.payload
    //     const updatedList = [updatedMovie, ...state.movies]
    //     return { movies: updatedList}
    case 'DELETE-MOVIE':
        const updatedList = state.movies.filter(movie => state.movies._id !== action.payload._id)
        return updatedList
    default:
      return state;
  }
};

export const MovieContextProvider = (props) => {
  const defaultMovieState = {
    movies: null,
  };

  const [state, dispatch] = useReducer(movieReducer, defaultMovieState);

  return (
    <MovieContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </MovieContext.Provider>
  );
};
