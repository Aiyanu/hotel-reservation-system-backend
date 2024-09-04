import { IRoom } from "./room.interface";

export interface IHotel {
  id: string;
  name: string;
  address: string;
  rooms: IRoom[];
}
