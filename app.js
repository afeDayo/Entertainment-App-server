require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const movieRouter = require("./routes/movieRouter");
const bookmarkRouter = require("./routes/bookmarkRouter");
const errorMiddleware = require("./middleware/error");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/bookmark", bookmarkRouter);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");

    await app.listen(port);
    console.log(`Server is listening on PORT: ${port}`);
  } catch (err) {
    console.error("Unable to Connect to the Database:", err.message);
    process.exit(1);
  }
};

start();
