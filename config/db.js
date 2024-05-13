const mysql = require("mysql2");

const DEBUG = parseInt(process.env.IN_DEV);

console.log(process.env.IAM_DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  supportBigNumbers: process.env.DB_SUPPORT_BIG_NUMBERS,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: process.env.DB_ALLOW_MS,
  port: process.env.DB_PORT
});

pool.getConnection((error, connection) => {
  if (error) {
    throw error;
  }

  if (DEBUG) {
    console.log("Connected to database");
  }
  connection.release();
});


module.exports = pool.promise();
