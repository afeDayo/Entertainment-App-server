const express = require("express");
const methodNotAllowed = require("../utils/methodNotAllowed");
const {
  allBookmarks,
  addBookmarks,
  removeBookmarks,
} = require("../controllers/bookmarkController");

const router = express.Router();

router.route("/").get(allBookmarks).all(methodNotAllowed);
router.route("/add/:id").get(addBookmarks).all(methodNotAllowed);
router.route("/remove/:id").get(removeBookmarks).all(methodNotAllowed);

module.exports = router;
