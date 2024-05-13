import { verify } from "jsonwebtoken";

import logError from "../utils/errors/logError";

const SECRET_KEY = process.env.JWT_KEY;
const DEBUG = parseInt(process.env.IN_DEV);
const LOC = "MIDDLEWARE-Security";

export default class {

  /**
 * This middleware is used to verify if the request have proper
 * authorization or not
 * @param {*} req
 * @param {*} res
 * @param {*} next
  */
  static authenticate = (req, res, next) => {
    try {
      const jwtToken = req.headers.authorization.split(" ")[1];
      const tokenData = verify(jwtToken, SECRET_KEY);
      req.userData = tokenData;

      if (req.headers["payload-authorization"] !== undefined) {
        const payloadToken = req.headers["payload-authorization"];
        req.payload = this.extract(payloadToken);
      }
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

  /**
   * This method will extract the user data from the provided 
   * token
   * @param {*} jwtToken 
   * @returns payloadData
   */
  static extract = (jwtToken) => {
    try {
      const tokenData = verify(jwtToken, SECRET_KEY);
      return tokenData;
    } catch (error) {
      error.status = error.status || 401;
      error.message = "Token Extraction Failed!";

      if (DEBUG) {
        logError(error, LOC);
      }
      throw error;
    }
  };
}