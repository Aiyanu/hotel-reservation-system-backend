import {
  IFindRoomQuery,
  IRoom,
  IRoomCreationBody,
  IRoomRepository,
} from "../interfaces/room.interface";
import { Room } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class RoomRepository implements IRoomRepository {
  private roomRepository: Repository<Room>;

  constructor() {
    this.roomRepository = AppDataSource.getRepository(Room);
  }

  async fetchOne(query: IFindRoomQuery): Promise<IRoom | null> {
    const room = await this.roomRepository.findOne(query);
    return room;
  }
  async fetchAll(query: IFindRoomQuery): Promise<IRoom[] | []> {
    const rooms = await this.roomRepository.find(query);
    return rooms;
  }
  async create(record: IRoomCreationBody): Promise<IRoom> {
    const room = this.roomRepository.create(record);
    await this.roomRepository.save(room);
    return room;
  }
  async updateOne(
    searchBy: IFindRoomQuery,
    data: Partial<IRoom>
  ): Promise<void> {
    await this.roomRepository.update(searchBy as FindOptionsWhere<Room>, data);
  }
  async deleteOne(searchBy: IFindRoomQuery): Promise<void> {
    await this.roomRepository.delete(searchBy as FindOptionsWhere<Room>);
  }
}

export default RoomRepository;
