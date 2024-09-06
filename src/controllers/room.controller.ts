import { Request, Response } from "express";
import RoomService from "../services/room.service";

class RoomController {
  private roomService: RoomService;
  constructor(_roomService: RoomService) {
    this.roomService = _roomService;
  }
  async getAllRooms(req: Request, res: Response) {}
  async getRoomById(req: Request, res: Response) {}
  async createRoom(req: Request, res: Response) {}
  async updateRoom(req: Request, res: Response) {}
  async deleteRoom(req: Request, res: Response) {}
}

export default RoomController;
