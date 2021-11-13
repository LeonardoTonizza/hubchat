import "dotenv/config";

import cors from "cors";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { createServer } from "http";
import path from "path";

import { router } from "./routes";
import { globalErrors } from "./middlewares/globalErrors";
import { createSocket } from "./io";

const mongoUri = String(process.env.MONGO_URI);
mongoose
  .connect(mongoUri)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Databased failed: ", error));

const app = express();
const server = createServer(app);
const io = createSocket(server);

app.use(express.json());
app.use(cors());
app.use((_, response, next) => {
  response.io = io;
  next();
});

app.use("/api", router);

app.use(express.static(path.resolve(__dirname, "..", "..", "public")));

app.use(globalErrors);

export { server };
