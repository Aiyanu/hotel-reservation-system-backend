import { FindOptionsWhere } from "typeorm";
import {
  IHotel,
  IHotelCreationBody,
  IHotelRepository,
} from "../interfaces/hotel.interface";
import { Hotel } from "../entities";

class HotelService {
  private hotelRepository: IHotelRepository;
  constructor(_hotelRepository: IHotelRepository) {
    this.hotelRepository = _hotelRepository;
  }
  async addHotel(hotelData: IHotelCreationBody) {
    return await this.hotelRepository.create(hotelData);
  }
  async getAllHotels() {
    return await this.hotelRepository.fetchAll({ where: {} });
  }
  async getHotelByField(hotel: Partial<IHotel>) {
    return await this.hotelRepository.fetchOne({
      where: { ...hotel } as FindOptionsWhere<Hotel>,
    });
  }
  async updateHotel(id: string, hotelData: Partial<IHotelCreationBody>) {
    return await this.hotelRepository.updateOne({ id }, hotelData);
  }
  async deleteHotel(id: string) {
    return await this.hotelRepository.deleteOne({ id });
  }
}
export default HotelService;
