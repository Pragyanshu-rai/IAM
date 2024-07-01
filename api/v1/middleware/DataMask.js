const logError = require("../utils/error/logError");

const DEBUG = parseInt(process.env.IN_DEV);
const LOC = "MIDDLEWARE-Data Mask";

module.exports = class {

  /**
   * This function throws an error if the target object does not map to the
   * mask.
   * @param {*} target 
   * @param {*} mask 
   * @param {*} next 
   */
  static dataMask = (target, mask, next) => {

    try {
      let missingFields = new Array();

      for (const key in mask) {

        if (target[key] === null || target[key] === undefined) {
          missingFields.push(key);
        }
      }

      if (missingFields.length > 0) {
        throw new Error(`Missing field(s) - ${missingFields.join(", ")}.`);
      }
      next();
    } catch (error) {
      error.status = error.status || 400;
      error.message = (error.message === undefined ? "Missing Data!" : error.message);

      if (DEBUG) {
        logError(error, LOC);
      }
      next(error);
    }
  };

  /**
   * This middleware function validates the object body against the 
   * registration mask.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static registration = (req, res, next) => {
    const mask = {
      "first_name":"string",
      "last_name":"string",
      "gender":"string",
      "email":"string",
      "mobile":"string",
      "password":"string"
    };
    this.dataMask(req.body, mask, next);
  };

  /**
   * This middleware function validates the req body against the login mask.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static login = (req, res, next) => {
    const mask = {
      "email":"string",
      "password":"string"
    };
    this.dataMask(req.body, mask, next);
  };
};