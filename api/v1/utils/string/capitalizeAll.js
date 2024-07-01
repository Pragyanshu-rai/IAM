const capitalize = require("./capitalize");

/**
 * Given the string this function will capitalize
 * all the words in it
 * @param {*} target 
 * @returns string
 */
module.exports = (target) => {
  const result = target.split(" ");

  return result.map((entry) => {
    return capitalize(entry);
  }).join(" ");
};