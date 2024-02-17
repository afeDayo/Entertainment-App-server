require("dotenv").config();

const mongoose = require("mongoose");

const Movie = require("./models/movies");

const movieJson = require("./movies.json");

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
    console.log("Deleting...");

    await Movie.deleteMany();
    console.log("Previous once deleted");
    console.log("Uploading...");

    await Movie.create(movieJson);

    console.log("Movie Uploaded Successfully");

    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
    process.exit(1);
  }
};

start();
