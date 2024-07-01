/**
 * Used to print all the routes registered to the routers
 * @param {*} routers 
 */
module.exports = (routers) => {
  const startPrompt = "Listing All The Endpoints";
  const limit = 90;
  const endPrompt = "End Of List";
  console.log("\n" + startPrompt + "-".repeat(limit - (startPrompt.length)) + "\n");

  routers.forEach((routeObject) => {
    const port = routeObject.port;
    const host = routeObject.host;
    const base = routeObject.basePath;
    const protocol = routeObject.protocol;
    const currentRouter = routeObject.router;

    currentRouter.stack.forEach((currentStack, index) => {
      const route = currentStack.route;
      const path = route.path;
      const method = Object.keys(route.methods).pop().toUpperCase();
      const padding = (9 - method.length);

      console.log(`${index + 1}- [${method}]${" ".repeat(padding)}${protocol}://${host}:${port}${base}${path}`);
    });
  });
  console.log("\n" + endPrompt + "-".repeat(limit - (endPrompt.length)) + "\n");
};