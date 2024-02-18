const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register).all(methodNotAllowed);

router.route("/login").post(login).all(methodNotAllowed);

router.route("/user").post(auth, getUser).all(methodNotAllowed);

module.exports = router;
