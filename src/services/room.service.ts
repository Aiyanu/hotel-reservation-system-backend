import { IRoomRepository } from "../interfaces/room.interface";

class RoomService {
  private roomRepository: IRoomRepository;
  constructor(_roomRepository: IRoomRepository) {
    this.roomRepository = _roomRepository;
  }
}
export default RoomService;
