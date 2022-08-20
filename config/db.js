const mysql = require("mysql2");

const DEBUG = parseInt(process.env.IN_DEV);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  supportBigNumbers: process.env.DB_SUPPORT_BIG_NUMBERS,
  password: process.env.IAM_DB_PASSWORD,
  database: process.env.IAM_DB_NAME,
  multipleStatements: process.env.DB_ALLOW_MS,
});

if (DEBUG) {
  console.log("Connected to database");
}

module.exports = pool.promise();
