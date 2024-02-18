const Movie = require("../models/movies");
const customError = require("../utils/customError");

const allData = async (req, res, next) => {
  try {
    const data = await Movie.find({});
    res.status(200).json({ data });
  } catch (error) {
    next(customError("Error fetching all data", 500));
  }
};

const allSeries = async (req, res, next) => {
  try {
    const series = await Movie.find({ type: "series" });
    res.status(200).json({ data: series });
  } catch (error) {
    next(customError("Error fetching series data", 500));
  }
};

const allMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ type: "movie" });
    res.status(200).json({ data: movies });
  } catch (error) {
    next(customError("Error fetching movies data", 500));
  }
};

module.exports = { allData, allSeries, allMovies };
