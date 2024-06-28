const UserModel = require('../models/user.model');

/**
 * This function is used to update the user password
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  const password = req.body.password;
  req.body.id = req.userData.data.id;
  const userModel = new UserModel(req.body);
  await userModel.update(password);
  
  return res.status(201).json({
    message: "Password Change Successful!"
  });
};