const jwt = require("jsonwebtoken");

const logError = require("../utils/errors/logError");

const SECRET_KEY = process.env.JWT_KEY;
const DEBUG = parseInt(process.env.IN_DEV);
const LOC = "MIDDLEWARE-AUTH";

/**
 * This middleware is used to verify if the request have proper
 * authorization or not
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  try {
    const jwt_token = req.headers.authorization.split(" ")[1];
    const token_data = jwt.verify(jwt_token, SECRET_KEY);
    req.userData = token_data;
    next();
  } catch (error) {
    error.status = error.status || 401;
    error.message = "Authentication Failed!";

    if (DEBUG) {
      logError(error, LOC);
    }
    next(error);
  }
};
