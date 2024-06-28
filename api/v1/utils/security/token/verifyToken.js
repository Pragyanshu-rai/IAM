const jwt = require("jsonwebtoken");

const decrypt = require("../cipher/decryptRSA");

/**
 * Given the encrypted Token and secret key this function returns
 * the token data.
 * @param {*} token 
 * @param {*} key 
 * @returns 
 */
module.exports = (token, key) => {

  try {
    const decryptedToken = decrypt(token);
    const tokenData = jwt.verify(decryptedToken, key);
    return tokenData;
  } catch (error) {
    throw new Error("Token Verification Exception");
  }
};