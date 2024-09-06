import {
  IAvailabilityCreationBody,
  IAvailabilityRepository,
} from "../interfaces/availability.interface";

class AvailabilityService {
  private availabilityRepository: IAvailabilityRepository;
  constructor(_availabilityRepository: IAvailabilityRepository) {
    this.availabilityRepository = _availabilityRepository;
  }
  async getRoomAvailability(roomId: string) {}
  async setRoomAvailability(
    roomId: string,
    availabilityData: IAvailabilityCreationBody
  ) {}
}
export default AvailabilityService;
