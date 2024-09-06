import { IHotelRepository } from "../interfaces/hotel.interface";

class HotelService {
  private hotelRepository: IHotelRepository;
  constructor(_hotelRepository: IHotelRepository) {
    this.hotelRepository = _hotelRepository;
  }
  async getAllHotels() {
    this.hotelRepository.fetchAll({ where: {} });
  }
}
export default HotelService;
