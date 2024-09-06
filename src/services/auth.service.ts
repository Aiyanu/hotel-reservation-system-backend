import {
  IUserCreationBody,
  IUserRepository,
} from "../interfaces/user.interface";

class AuthService {
  private userRepository: IUserRepository;
  constructor(_userRepository: IUserRepository) {
    this.userRepository = _userRepository;
  }
  async login(email: string) {
    return await this.userRepository.fetchOne({
      where: { email },
    });
  }
  async register(userData: IUserCreationBody) {
    return await this.userRepository.create(userData);
  }
  async forgotPassword(email: string) {}
  async resetPassword(token: string, password: string) {}
}
export default AuthService;
