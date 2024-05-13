import express from "express";
import { urlencoded, json } from "body-parser";
import logger from "morgan";

import userRoutes from "./api/v1/routes/user.routes";
import logError from "./api/v1/utils/errors/logError";

const LOC = "APP";
const app = express();
const DEBUG = parseInt(process.env.IN_DEV);
const logMode = DEBUG ? "dev" : "common";

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(logger(logMode));

//  application url paths
app.use("/v1/user", userRoutes);

// if all the above handlers are not able to handle the request
app.use((req, res, next) => {
  const error = new Error("Resource Not Found!");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  error.loc = error.loc || LOC;
  error.message =
    error.message !== undefined ? error.message : "Something went wrong!";

  res.status(error.status || 500).json({
    message: error.message,
  });

  if (DEBUG) {
    logError(error);
  }
});

export default app;
