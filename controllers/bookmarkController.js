const Movie = require("../models/movies");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
  const { userId } = req.user;
  const bookmarks = await Movie.find({ bookmarkedBy: userId });
  res.status(200).json({
    data: bookmarks,
  });
};

const addBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkedBy: userId } }
    );

    if (!movie) {
      throw customError(`No Movie with ID:${id}`, 400);
    }

    res.status(200).json({
      message: "Movie Bookmarked!",
    });
  } catch (error) {
    next(error);
  }
};

const removeBookmark = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );

    if (!movie) {
      throw customError(`No Movie with ID:${id}`, 400);
    }

    res.status(200).json({
      message: "Bookmark Removed!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
