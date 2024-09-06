import express, { Request, Response } from "express";
const router = express.Router();
const paymentRouter = () => {
  router.post("/:bookingId/payments");
  router.get("/:bookingId/payments");
  router.post("/initialize");
  router.get("/verify/:reference");
  return router;
};

export default paymentRouter();
