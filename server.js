// setting all the environment variables
require("dotenv").config({
  path: ".env.dev",
});

const http = require("http");
const app = require("./app");
const { printRoutes } = require("./utils/routes/printRoutes");

const app_port = process.env.APP_PORT || 3001;
const server = http.createServer(app);

console.log("Listing All the endpoints...\n");
app._router.stack.forEach(printRoutes.bind(null, []));
console.log("\nDone");

server.listen(app_port, () => console.log(`Listening on port ${app_port}`));
