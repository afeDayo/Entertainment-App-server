const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

const extractToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw customError("No Token Provided", 401);
  }

  return authHeader.split(" ")[1];
};

const auth = (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return next(customError("Unauthorized", 401));
  }
};

module.exports = auth;
