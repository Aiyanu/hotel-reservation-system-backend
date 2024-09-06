import { Request, Response } from "express";
import AvailabilityService from "../services/availability.service";

class AvailabilityController {
  private availabilityService: AvailabilityService;
  constructor(_availabilityService: AvailabilityService) {
    this.availabilityService = _availabilityService;
  }
  async getRoomAvailability(req: Request, res: Response) {}
  async setRoomAvailability(req: Request, res: Response) {}
}

export default AvailabilityController;
