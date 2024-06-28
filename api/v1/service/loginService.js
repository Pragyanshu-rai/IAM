const UserModel = require('../models/user.model');
const createRSAToken = require("../utils/security/token/createRSAToken");

const SECRET_KEY = process.env.JWT_KEY;

/**
 * This function will log the user in and return the auth token if the
 * authentication is successful
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  const password = req.body.password;
  const userModel = new UserModel(req.body);
  const user_data = await userModel.login(password);
  const auth_token = createRSAToken(
    {
      email: userModel.user.email,
      data: user_data
    },
    SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );
  
  return res.status(200).json({
    message: "Login Successful!",
    authToken: `Token ${auth_token}`
  });
};