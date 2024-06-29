const express = require("express");

const userController = require("../controller/user.controller");

// middleware import
const Security = require('../middleware/Security');
const DataMask = require('../middleware/DataMask');

const userRoutes = express.Router();
const LOC = "SERVER";

// @route GET && POST && PUT && PATCH && OPTIONS - /v1/user
try {
  userRoutes.post(
    '/register',
    DataMask.registration,
    userController.userSignUp
  );
  userRoutes.post(
    '/login',
    DataMask.login,
    userController.userLogin
  );
  userRoutes.patch(
    '/update', 
    Security.authenticate, 
    userController.updateUser
  );
  userRoutes.put(
    '/reset-password-request/:id/:forgot/:token', 
    Security.screen,  
    userController.resetPassword
  );
  userRoutes.post(
    '/update-password', 
    Security.screen,  
    userController.initiateResetRequest
  );
  userRoutes.get(
    '/users', 
    Security.authenticate, 
    userController.getMultipleUsers
  );
  userRoutes.delete(
    '/delete', 
    Security.authenticate, 
    userController.deleteUser
  );
  userRoutes.options(
    '/test-auth', 
    Security.authenticate, 
    userController.testAuth
  );
} catch (error) {
  error.loc = error.loc || LOC;
  throw error;
}

module.exports = userRoutes;
