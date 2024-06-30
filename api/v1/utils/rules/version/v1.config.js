const userRoutes = require("../../../routes/user.routes");

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
    basePath: "/v1/user",
  }
];