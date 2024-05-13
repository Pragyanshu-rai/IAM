class DBClass {

  constructor(seeker, userIds) {
    this.id = seeker.id;
    this.userIds = userIds;
    this.users = new Array();
  }

  // db methods

  /**
   * This method will return the query to fetch multiple users using their id
   * @returns 
   */
  createFetchMultipleUsersQuery() {
    const userIds = this.userIds.join(', ');

    if (this.userIds.length === 0) {
      throw new Error();
    }
    const getMultipleUsers = `
    SELECT id, first_name, middle_name, last_name
    FROM User
    WHERE id in (${userIds})
    ;
    `;
    return getMultipleUsers;
  }

  /**
   * This method will return the query to delete multiple users using their id
   * @returns 
   */
  createDeleteMultipleUsersQuery() {

    if (this.userIds === undefined || this.userIds.length === 0) {
      throw new Error();
    }
    const userIds = this.userIds.join(', ');
    const deleteMultipleUsers = `
    DELETE
    FROM User
    WHERE id IN (${userIds})
    ;
    `;
    return deleteMultipleUsers;
  }
}

module.exports = DBClass;