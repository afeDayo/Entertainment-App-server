require("dotenv").config();
const mongoose = require("mongoose");
const Movies = require("./models/movies");
const movieJson = require("./movies.json");

const startPopulating = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
    console.log("Deleting...");
    await Movies.deleteMany();
    console.log("Previous once deleted");
    console.log("Uploading...");
    await Movies.create(movieJson);
    console.log("Movie Uploaded Successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
    process.exit(1);
  }
};

startPopulating();
