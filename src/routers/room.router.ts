import express, { Request, Response } from "express";
const router = express.Router();
const hotelRouter = () => {
  router.get("/:hotelId/rooms");
  router.get("/:hotelId/rooms/:roomId");
  router.post("/:hotelId/rooms");
  router.patch("/:hotelId/rooms/:roomId");
  router.post("/upload/room");
  router.delete("/:hotelId/rooms/:roomId");
  return router;
};

export default hotelRouter();
