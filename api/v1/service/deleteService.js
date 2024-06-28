const UserModel = require('../models/user.model');
const MultipleUserModel = require('../models/multiple-user.model');

const EDITOR = require("../utils/rules/roles").EDITOR;

/**
 * This function is used for Deleting the users from the database
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports = async (req, res) => {
  let response;
  const userIds = req.query.ids;
  req.body.id = req.userData.data.id;
  req.body.role = req.userData.data.role;
  let actor = (req.userData.data.role === 'System') ? 'App' : 'User';
  const authorizedBy = {
    id: req.body.id
  };

  if (userIds) {
    await UserModel.roleInOrError(authorizedBy, EDITOR);

    if (userIds.length < 1) {
      throw setError(new Error(), LOC, 400, "Cannot delete users, Ids not provided!");
    }
    const userIdArray = userIds.split(',');
    const multipleUserModel = new MultipleUserModel(req.body, userIdArray);
    await multipleUserModel.deleteMultipleUsers();
    response = {
      message: "Users Deleted!",
      user_id: userIds
    };
  } else {
    const user = new UserModel(req.body);
    await user.delete();
    response = {
      message: `${actor} Deleted!`,
      user_id: req.body.id
    };
  }

  return res.status(200).json(response);
};