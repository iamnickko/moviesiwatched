require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const moviesRouter = require("./routes/movies");
const authRouter = require('./routes/auth')

const corsOptions = {
    origin: 'https://moviesiwatched-api.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    optionsSuccessStatus: 200,
    credentials: true
  }

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter)
app.use("/api/movies", moviesRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`App is running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
