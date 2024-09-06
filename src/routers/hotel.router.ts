import express, { Request, Response } from "express";
const router = express.Router();
const hotelRouter = () => {
  router.get("/");
  router.get("/:id");
  router.post("/");
  router.patch("/:id");
  router.delete("/:id");
  router.post("/upload/profile");
  return router;
};

export default hotelRouter();
