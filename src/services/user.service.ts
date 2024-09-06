import {
  IFindUserQuery,
  IUserRepository,
  IUser,
  IUserCreationBody,
} from "../interfaces/user.interface";

class UserService {
  private userRepository: IUserRepository;
  constructor(_userRepository: IUserRepository) {
    this.userRepository = _userRepository;
  }
  async getAllUsers() {
    const query = { where: {} } as IFindUserQuery;
    return await this.userRepository.fetchAll(query);
  }
  async getUserByField(userData: Partial<IUser>) {
    const query = { where: { ...userData } } as IFindUserQuery;
    return await this.userRepository.fetchOne(query);
  }

  async updateUser(
    searchBy: Partial<IUser>,
    userData: Partial<IUserCreationBody>
  ) {
    await this.userRepository.updateOne(searchBy, userData);
  }
  async deleteUser(userId: string) {
    const query = { where: { id: userId } } as IFindUserQuery;
    await this.userRepository.deleteOne(query);
  }
}
export default UserService;
