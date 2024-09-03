import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { init } from "./src/database/init";

const app = express();
const PORT = process.env.PORT;
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err) {
      return res
        .status(500)
        .json({ status: false, message: (err as TypeError).message });
    }
  } catch (e) {}
});

app.get("/", (req, res) => {
  res.status(200).json({ status: true });
});

const Bootstrap = async function () {
  await init()
    .then(() => {
      app.listen(PORT, () => {
        console.log("Connection has been established successfully.");
      });
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

Bootstrap();
