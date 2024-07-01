const userRoutes = require("../../api/v1/routes/user.routes");

const PORT = process.env.APP_PORT;

/**
 * Contains all basePath and router
 */
module.exports = [
  {
    port: PORT,
    protocol: "http",
    host: "localhost",
    router: userRoutes,
    basePath: "/api/v1/user",
  }
];