import {
  IFindAvailabilityQuery,
  IAvailability,
  IAvailabilityCreationBody,
  IAvailabilityRepository,
} from "../interfaces/availability.interface";
import { Availability } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class AvailabilityRepository implements IAvailabilityRepository {
  private availabilityRepository: Repository<Availability>;

  constructor() {
    this.availabilityRepository = AppDataSource.getRepository(Availability);
  }

  async fetchOne(query: IFindAvailabilityQuery): Promise<IAvailability | null> {
    const availability = await this.availabilityRepository.findOne(query);
    return availability;
  }

  async fetchAll(
    query: IFindAvailabilityQuery
  ): Promise<IAvailability[] | null> {
    const availabilities = await this.availabilityRepository.find(query);
    return availabilities.length ? availabilities : null;
  }

  async create(record: IAvailabilityCreationBody): Promise<IAvailability> {
    const availability = this.availabilityRepository.create(record);
    await this.availabilityRepository.save(availability);
    return availability;
  }

  async updateOne(
    searchBy: FindOptionsWhere<Availability>,
    data: Partial<IAvailability>
  ): Promise<void> {
    await this.availabilityRepository.update(searchBy, data);
  }
  async deleteOne(searchBy: FindOptionsWhere<Availability>): Promise<void> {
    await this.availabilityRepository.delete(searchBy);
  }
}

export default AvailabilityRepository;
