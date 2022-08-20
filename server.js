// setting all the environment variables
require("dotenv").config({
  path: ".env.dev",
});

const http = require("http");
const app = require("./app");

const app_port = process.env.APP_PORT || 3001;
const server = http.createServer(app);

server.listen(app_port, () => console.log(`Listening on port ${app_port}`));
