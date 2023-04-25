import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import { ConnectDB } from "./mongoDb/connectDb.js";

import DataRoutes from "./routes/DataRoutes.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App");
});

app.use("/api/medicaluav", DataRoutes);

const startServer = () => {
  try {
    ConnectDB(process.env.MONGODB_URL);
    app.listen(5050, () => {
      console.log("http://localhost:5050");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
