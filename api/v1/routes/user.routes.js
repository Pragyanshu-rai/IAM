const express = require("express");

const userController = require("../controller/user.controller");
const checkAuth = require('../middleware/check-auth');

const userRoutes = express.Router();
const LOC = "SERVER";

// @route GET && POST && PUT && PATCH && OPTIONS - /v1/user
try {
  userRoutes.post('/register', userController.userSignUp);
  userRoutes.post('/login', userController.userLogin);
  userRoutes.patch('/update', checkAuth, userController.updateUser);
  userRoutes.put('/update-password', checkAuth, userController.updatePassword);
  userRoutes.get('/multiple-users', checkAuth, userController.getMultipleUsers);
  userRoutes.delete('/delete', checkAuth, userController.deleteUser);
  userRoutes.options('/test-auth', checkAuth, userController.testAuth);
} catch (error) {
  error.loc = error.loc || LOC;
  throw error;
}

module.exports = userRoutes;
