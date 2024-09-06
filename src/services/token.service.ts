import { IUser } from "../interfaces/user.interface";
import {
  IToken,
  ITokenCreationBody,
  ITokenRepository,
} from "../interfaces/token.interface";

class TokenService {
  private tokenRepository: ITokenRepository;
  private defaultExpirationMinutes = 5;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  // Generate a token of a given length
  private generateCode = (num: number = 15): string => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    let result = randomness + dateString;
    result = result.length > num ? result.substring(0, num) : result;
    return result.toUpperCase();
  };

  // Check if token already exists
  private async isCodeUnique(code: string): Promise<boolean> {
    const existingToken = await this.tokenRepository.findToken({ code });
    return !existingToken;
  }

  // Generate a unique code
  private async generateUniqueCode(length: number): Promise<string> {
    let tokenValue = this.generateCode(length);
    while (!(await this.isCodeUnique(tokenValue))) {
      tokenValue = this.generateCode(length);
    }
    return tokenValue;
  }

  // Save a new token with a default expiration of 5 minutes
  public async createToken(
    user: IUser,
    type: string,
    length: number,
    expiration?: Date
  ): Promise<IToken> {
    const tokenValue = await this.generateUniqueCode(length);
    const tokenExpiration =
      expiration ||
      new Date(Date.now() + this.defaultExpirationMinutes * 60 * 1000); // 5 minutes

    const token = await this.tokenRepository.createToken({
      code: tokenValue,
      type,
      user,
      expiration: tokenExpiration,
      isUsed: false,
    });
    return token;
  }

  // Verify a token
  public async verifyToken(
    token: Partial<ITokenCreationBody>
  ): Promise<IToken | null> {
    return this.tokenRepository.findToken(token);
  }

  // Invalidate a token
  public async invalidateToken(
    token: Partial<ITokenCreationBody>
  ): Promise<void> {
    return this.tokenRepository.invalidateToken(token);
  }
}

export default TokenService;
