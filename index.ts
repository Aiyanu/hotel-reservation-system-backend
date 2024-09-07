import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { init } from "./src/database/init";
import { logRequests } from "./src/middlewares/middleware";
import {
  authRouter,
  availabilityRouter,
  bookingRouter,
  hotelRouter,
  paymentRouter,
  reviewRouter,
  roomRouter,
  userRouter,
} from "./src/routers";
const app = express();
const PORT = process.env.PORT;
app.use(logRequests);
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

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/hotels", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/rooms", availabilityRouter);
app.use("/api/hotels", reviewRouter);
app.use("/api/bookings", paymentRouter);

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
