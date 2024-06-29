/**
 * Given the req object, userId and the token this function will 
 * generate a dynamic link with the provided token
 * @param {*} req 
 * @param {*} userId 
 * @param {*} token 
 * @returns url
 */
module.exports = (req, userId, token) => {
  const resetURL = `${req.protocol}://${req.get("host")}/v1/user/reset-password-request/${userId}/true/${token}`;

  return resetURL;
};
