import express, { Request, Response } from "express";
import { AvailabilityService } from "../services";
import { AvailabilityRepository } from "../repository";
import { AvailabilityController } from "../controllers";
const router = express.Router();
const availabilityService = new AvailabilityService(
  new AvailabilityRepository()
);
const availabilityController = new AvailabilityController(availabilityService);

const availabilityRouter = () => {
  router.get("/:roomId/availability");
  router.post("/:roomId/availability");
  return router;
};

export default availabilityRouter();
