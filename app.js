const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const movieRouter = require("./routes/movieRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const error = require("./middleware/error");
const auth = require("./middleware/auth");
const cors = require("cors");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(auth);

app.use("/api/auth", authRouter);

app.use("/api/movies", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

app.use(error);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server is runing on PORT ${port}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Unable to connect");
  }
};
start();
