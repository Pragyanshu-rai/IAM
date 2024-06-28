const encrypt = require("../cipher/encryptRSA");
const createToken = require("./createToken");

/**
 * Given the data, key and options this function returns the encrypted
 * jwt token.
 * @param {*} data 
 * @param {*} key 
 * @param {*} options 
 * @returns 
 */
module.exports = (data, key, options = {}) => {
  try {
    const token = createToken(
      key,
      options.expiresIn,
      data.email,
      data.data,
      options.issuer
    );
    const encryptedToken = encrypt(token);
    return encryptedToken;
  } catch (error) {
    console.log(error);
    throw new Error("Error Occurred in JWT creation");
  }
};