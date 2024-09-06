import {
  IFindUserQuery,
  IUser,
  IUserCreationBody,
  IUserRepository,
} from "../interfaces/user.interface";
import { User } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class UserRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async fetchOne(query: IFindUserQuery): Promise<IUser | null> {
    const user = await this.userRepository.findOne(query);
    return user;
  }

  async fetchAll(query: IFindUserQuery): Promise<IUser[] | null> {
    const users = await this.userRepository.find(query);
    return users;
  }
  async create(record: IUserCreationBody): Promise<IUser> {
    const user = this.userRepository.create(record);
    await this.userRepository.save(user);
    return user;
  }
  async updateOne(
    searchBy: IFindUserQuery,
    data: Partial<IUser>
  ): Promise<void> {
    await this.userRepository.update(searchBy as FindOptionsWhere<User>, data);
  }
  async deleteOne(searchBy: IFindUserQuery): Promise<void> {
    await this.userRepository.delete(searchBy as FindOptionsWhere<User>);
  }
}

export default UserRepository;
