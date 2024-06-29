/**
 * Given the target string this function will capitalize its first letter
 * @param {*} target 
 * @returns string
 */
module.exports = (target) => {
  return target[0].toUpperCase() + target.slice(1);
};