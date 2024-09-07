import {
  IFindHotelQuery,
  IHotel,
  IHotelCreationBody,
  IHotelRepository,
} from "../interfaces/hotel.interface";
import { Hotel } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class HotelRepository implements IHotelRepository {
  private hotelRepository: Repository<Hotel>;

  constructor() {
    this.hotelRepository = AppDataSource.getRepository(Hotel);
  }

  async fetchOne(query: IFindHotelQuery): Promise<IHotel | null> {
    const hotel = await this.hotelRepository.findOne(query);
    return hotel;
  }
  async fetchAll(query: IFindHotelQuery): Promise<IHotel[] | null> {
    const hotels = await this.hotelRepository.find(query);
    return hotels;
  }
  async create(record: IHotelCreationBody): Promise<IHotel> {
    const hotel = this.hotelRepository.create(record);
    await this.hotelRepository.save(hotel);
    return hotel;
  }
  async updateOne(
    searchBy: Partial<IHotel>,
    data: Partial<IHotelCreationBody>
  ): Promise<void> {
    await this.hotelRepository.update(
      { ...searchBy } as FindOptionsWhere<Hotel>,
      data
    );
  }
  async deleteOne(searchBy: Partial<IHotelCreationBody>): Promise<void> {
    await this.hotelRepository.delete(searchBy as FindOptionsWhere<Hotel>);
  }
}

export default HotelRepository;
