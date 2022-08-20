const db = require('../../../config/db');
const MultipleUserClass = require('../classes/multiple-user.class');

const DEBUG = parseInt(process.env.IN_DEV);
const LOC = "DB MODEL";

class MultipleUserModel {

  constructor(seeker, userIds) {
    this.multipleUsers = new MultipleUserClass(seeker, userIds);
  }

  /**
   * This method when invoked will return the list of multiple users
   * @returns 
   */
  async getMultipleUsers() {

    try {
      const fetchMultipleUsers = this.multipleUsers.createFetchMultipleUsersQuery();
      const [users, _] = await db.execute(fetchMultipleUsers);
      return users;
    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = 401;

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : "Authentication Failed!";
      } else {
        error.message = "Authentication Failed!";
      }
      throw error;
    }
  }

  /**
   * This method when invoked will delete multiple users
   */
  async deleteMultipleUsers() {

    try {
      const deleteMultipleUsers = this.multipleUsers.createDeleteMultipleUsersQuery();
      await db.execute(deleteMultipleUsers);
    } catch (error) {
      error.loc = error.loc || LOC;
      error.status = 401;

      if (DEBUG) {
        error.message = (error.message !== undefined && error.message !== "") ? error.message : "Authentication Failed!";
      } else {
        error.message = "Authentication Failed!";
      }
      throw error;
    }
  }
}

module.exports = MultipleUserModel;