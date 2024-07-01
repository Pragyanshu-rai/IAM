const crypto = require("crypto");

/**
 * Given the max length this function returns a secure random string 
 * of that length if isFixed is passed as true else will return a
 * secure random string of random length
 * @param {*} max 
 * @param {*} isFixed 
 * @returns 
 */
module.exports = (max, isFixed = false) => {
  max = max < 20 ? 20 : max ;
  const length = isFixed ? max : crypto.randomInt(max-10, max);
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};