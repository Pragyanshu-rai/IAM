const jwt = require("jsonwebtoken");

const ISSUER = process.env.APP_NAME;

/**
 * Given the data this function returns a signed 
 * JSON Token
 * @param {*} SECRET_KEY 
 * @param {*} expiresIn 
 * @param {*} email 
 * @param {*} data 
 * @returns 
 */
module.exports = (SECRET_KEY, expiresIn, email, data, issuer, algorithm) => {

  try {
    return jwt.sign(
      {
        email: email,
        data: data,
        iat: Math.floor(Date.now() / 1000) - 30 
      },
      SECRET_KEY,
      {
        // algorithm: algorithm || ALGORITHM,
        expiresIn: expiresIn,
        issuer: issuer || ISSUER
      }
    );
  } catch (error) {
    throw new Error("Error In Token Generation");
  }
};