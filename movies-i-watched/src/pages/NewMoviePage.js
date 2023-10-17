import classes from './NewMoviePage.module.css'
import NewMovieForm from "../componenets/NewMovieForm";

const NewMoviePage = () => {
  return (
    <>
      <h1 className={classes.content}>Add A New Movie</h1>
      <NewMovieForm />
    </>
  );
};

export default NewMoviePage;
