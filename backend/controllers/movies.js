const Movie = require("../models/movie");

const getAllMovies = async (req, res) => {
  const user_id = req.user._id;
  try {
    const movies = await Movie.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: "No movies were found." });
  }
};

const getSingleMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({ _id: id });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: "That movie doesn't exist." });
  }
};

const editMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: "That movie doesn't exist." });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete({ _id: id });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: "That movie doesn't exist." });
  }
};

const createMovie = async (req, res) => {
  const user_id = req.user._id;
  const { title, rating, comments } = req.body;
  try {
    const movie = await Movie.create({ title, rating, comments, user_id });
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getSingleMovie,
  editMovie,
  deleteMovie,
};
