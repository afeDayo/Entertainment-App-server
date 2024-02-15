const Movie = require("../models/movies");
const customError = require("../utils/customError");

const allBookmarks = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user);

    const bookmarks = await Movie.find({
      bookmarkedBy: userId,
    });

    res.status(200).json({
      data: bookmarks,
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const addBookmarks = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const { userId } = req.user;

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $addToSet: { bookmarkedBy: userId } },
      { new: true }
    );

    if (!movie) {
      return next(customError(`No Movie with ID: ${id}`, 400));
    }

    res.status(200).json({
      message: "Movie Bookmarked",
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const removeBookmarks = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const { userId } = req.user;

    const movie = await Movie.findByIdAndUpdate(
      id,
      { $pull: { bookmarkedBy: userId } },
      { new: true }
    );

    if (!movie) {
      return next(customError(`No Movie with ID: ${id}`, 400));
    }

    res.status(200).json({
      message: "Bookmark Removed",
    });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = { allBookmarks, addBookmarks, removeBookmarks };

// const Movie = require("../models/movies");
// const customError = require("../utils/customError");

// const allBookmarks = async (req, res) => {
//   const { userId } = req.user;
//   console.log(req.user);
//   const bookmarks = await Movie.find({
//     bookmarkedBy: userId,
//   });
//   res.status(200).json({
//     data: bookmarks,
//   });
// };

// const addBookmarks = async (req, res, next) => {
//   const { id } = req.params;
//   console.log(req.params);
//   const { userId } = req.user;

//   const bookmarked = await Movie.findOneAndUpdate(
//     { _id: id },
//     { $push: { bookmarkedBy: userId } }
//   );

//   if (!bookmarked) {
//     return next(customError(`No Movie with ID: ${id}`, 400));
//   }

//   res.status(200).json({
//     message: "Movie Bookmarked",
//   });
// };

// const removeBookmarks = async (req, res, next) => {
//   const { id } = req.params;
//   console.log(req.params);
//   const { userId } = req.user;

//   const bookmarked = await Movie.findOneAndUpdate(
//     { _id: id },
//     { $pull: { bookmarkedBy: userId } }
//   );

//   if (!bookmarked) {
//     return next(customError(`No Movie with ID: ${id}`, 400));
//   }

//   res.status(200).json({
//     message: "Bookmark Removed",
//   });
// };

// module.exports = { allBookmarks, addBookmarks, removeBookmarks };
