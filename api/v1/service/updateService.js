const UserModel = require('../models/user.model');
const roles = require("../utils/rules/roles");

/**
 * This function is used to update the user details
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  req.body.id = req.userData.data.id;
  let actor = (req.userData.data.role === 'System') ? 'App' : 'User';
  const permissibleRoles = roles.EDITOR;

  if (permissibleRoles.includes(req.body.role)) {
    const authorizedBy = {
      id: req.headers.permissible
    };
    await UserModel.roleIsOrError(authorizedBy, 'Admin');

    if (req.body.role === 'Admin') {
      delete req.body.role;
    }
  }

  const userModel = new UserModel(req.body);
  await userModel.update();
  const updatedUser = await UserModel.findOne(userModel.user.id);
  
  return res.status(200).json({
    message: `${actor} Data Update Successful!`,
    updatedUser: updatedUser
  });
};