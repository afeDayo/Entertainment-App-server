require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 3000;

const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const cors = require("cors");

const bookmarkRouter = require("./routes/bookmarkRouter");

const error = require("./middleware/error");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

app.use(error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is listening on PORT: ${port}`);
    });
  } catch (err) {
    console.log("Unable to Connect");
  }
};

start();
