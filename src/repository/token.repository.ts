import { FindOptionsWhere, Repository } from "typeorm";
import { Token } from "../entities/Token.entity";
import {
  IFindTokenQuery,
  IToken,
  ITokenCreationBody,
  ITokenRepository,
} from "../interfaces/token.interface";
import AppDataSource from "../database";

class TokenRepository implements ITokenRepository {
  private readonly tokenRepository: Repository<Token>;
  constructor() {
    this.tokenRepository = AppDataSource.getRepository(Token);
  }
  async createToken(tokenData: ITokenCreationBody): Promise<IToken> {
    const token = this.tokenRepository.create(tokenData);
    return await this.tokenRepository.save(token);
  }
  async findToken(token: Partial<ITokenCreationBody>): Promise<Token | null> {
    return this.tokenRepository.findOne({
      where: { ...token } as FindOptionsWhere<Token>,
      relations: ["user"],
    });
  }
  async invalidateToken(token: Partial<ITokenCreationBody>): Promise<void> {
    this.tokenRepository.update(
      {
        ...token,
      } as FindOptionsWhere<Token>,
      { isUsed: false }
    );
  }
}
export default TokenRepository;
