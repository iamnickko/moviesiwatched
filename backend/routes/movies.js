const express = require("express");

const {
  createMovie,
  getAllMovies,
  getSingleMovie,
  editMovie,
  deleteMovie,
} = require("../controllers/movies");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate)

// GET /api/movies/
router.get("/", getAllMovies);

// GET /api/movies/:id
router.get("/:id", getSingleMovie);

// PUT /api/movies/:id
router.put("/:id", editMovie);

// DELETE /api/movies/:id
router.delete("/:id", deleteMovie);

// POST /api/movies/new
router.post("/new", createMovie);

module.exports = router;
