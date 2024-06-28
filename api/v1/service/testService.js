/**
 * This function is used for authentication test for tokens
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports = async (req, res) => {
  req.userData.iat = new Date(req.userData.iat * 1000).toString();
  req.userData.exp = new Date(req.userData.exp * 1000).toString();
  
  return res.status(200).json({
    message: "Authentication Test Passed!",
    data: req.userData
  });
};