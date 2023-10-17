const express = require("express");
const { register, login, logout } = require("../controllers/users");

const router = express.Router();

//POST /auth/register
router.post("/register", register);

// POST /auth/login
router.post("/login", login);

module.exports = router;
