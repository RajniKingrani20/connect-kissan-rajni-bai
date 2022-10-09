import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "config";
import cors from "cors";

const app = express();
app.use(cors());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

//Routes
import itemRoutes from "./routes/itemRoutes.js";
app.use("/api/items", itemRoutes);

import authRoutes from "./routes/authRoutes.js";
app.use("/api/user", authRoutes);

import locationRoutes from "./routes/locationsRoutes.js";

app.use("/api/locations", locationRoutes);

import pdfGenerateRoutes from "./routes/pdfGenerateRoutes.js";

app.use("/api/invoice", pdfGenerateRoutes);

import addressRoutes from "./routes/AddressingRoutes.js";

app.use("/api/geocoding", addressRoutes);

import utilityRoutes from "./routes/utilityRoutes.js";
app.use("/", utilityRoutes);

//MiddleWare
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(errorHandler);

// DB Config
const db = config.get("mongoURI");
// Port Config
const PORT = config.get("PORT");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected :) ..."))
  .catch((err) => console.log(err.message));

// Server Listen
const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
