import express, { Request, Response } from "express";
const router = express.Router();
const bookingRouter = () => {
  router.get("/:bookingId/payments");
  router.post("/:bookingId/payments");
  return router;
};

export default bookingRouter();
