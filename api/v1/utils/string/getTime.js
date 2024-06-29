const ttlUnits = require("../rules/ttlUnits");

/**
 * Given the ttl number and the *ttlUnit this function will give out a 
 * string containing the ttl string 
 * @param {*} ttl 
 * @param {*} ttlUnit 
 * @returns String
 */
module.exports = (ttl, ttlUnit="m") => {
  ttlUnit = ttlUnits.hasOwnProperty(ttlUnit)? ttlUnit : "m" ;
  return `${ttl} ${ttlUnits[ttlUnit]}${parseInt(ttl) > 1?"s":""}`;
};