const UserModel = require('../models/user.model');

const EDITOR = require("../utils/rules/roles").EDITOR;

/**
 * This function will register the user
 * @param {*} req 
 * @param {*} res 
 * @returns res
 */
module.exports = async (req, res) => {
  const password = req.body.password;
  let actor = (req.body.role === 'System') ? 'App' : 'User';
  const authorizedBy = {
    id: req.headers.permissible
  };

  if (req.body.role !== 'User') {
    await UserModel.roleInOrError(authorizedBy, EDITOR);
  }
  const userModel = new UserModel(req.body);
  await userModel.register(password);

  if (req.body.role === 'System') {
    await UserModel.addUserSystemEntry(req.body.email, authorizedBy.id);
  }
  let response = await UserModel.findByEmail(userModel.user.email);

  if (response.date_of_birth) {
    response.date_of_birth = response.date_of_birth.toISOString().split('T')[0];
  }
  
  return res.status(201).json({
    message: `${actor} registered successfully`,
    details: response
  });
};