// setting all the environment variables
require("dotenv").config({
  path: ".env",
});

const http = require("http");
const app = require("./app");
const printRoutes = require("./global/utils/printRoutes");
const allRoutes = require("./api/v1/utils/rules/version/v1.config");

const app_port = process.env.APP_PORT || 8081;
const server = http.createServer(app);

// printing all the registered routes
printRoutes(allRoutes);

server.listen(app_port, () => console.log(`Listening on port ${app_port}`));
