import express, { Request, Response } from "express";
const router = express.Router();
const reviewRouter = () => {
  router.get("/:hotelId/reviews");
  router.post("/:hotelId/reviews");
  router.patch("/:hotelId/reviews/:reviewId");
  router.delete("/:hotelId/reviews/:reviewId");
  return router;
};

export default reviewRouter();
