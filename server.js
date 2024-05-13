// setting all the environment variables
import { config } from "dotenv";

import { createServer } from "http";
import app, { _router } from "./app";
import { printRoutes } from "./utils/routes/printRoutes";

config({
  path: ".env.dev"
});

const app_port = process.env.APP_PORT || 3001;
const server = createServer(app);

console.log("Listing All the endpoints...\n");
_router.stack.forEach(printRoutes.bind(null, []));
console.log("\nDone");

server.listen(app_port, () => console.log(`Listening on port ${app_port}`));
