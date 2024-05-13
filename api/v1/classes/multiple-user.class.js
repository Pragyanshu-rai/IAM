const DBClass = require('../classes/multiple-user-mysql-db.class');

class MultipleUserClass {

  constructor(seeker, userIds) {
    this.DBClass = new DBClass(seeker, userIds);
  }

  // db methods

  /**
   * This method will return the query to fetch multiple users using their id
   * @returns 
   */
  createFetchMultipleUsersQuery() {
    const getMultipleUsers = this.DBClass.createFetchMultipleUsersQuery();
    return getMultipleUsers;
  }

  /**
   * This method will return the query to delete multiple users using their id
   * @returns 
   */
  createDeleteMultipleUsersQuery() {
    const deleteMultipleUsers = this.DBClass.createDeleteMultipleUsersQuery();
    return deleteMultipleUsers;
  }
}

module.exports = MultipleUserClass;