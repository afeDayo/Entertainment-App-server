require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("./models/movies");
const movieJson = require("./movies.json");

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");

    console.log("Deleting previous records...");
    await Movie.deleteMany();
    console.log("Previous records deleted successfully");

    console.log("Uploading new records...");
    await Movie.create(movieJson);
    console.log(movieJson);
    console.log("Movies uploaded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    console.log("Unable to connect");
    process.exit(1);
  }
};

start();
