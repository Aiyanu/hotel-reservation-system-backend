import crypto from "crypto";
import { ITokenRepository } from "../interfaces/token.interface";
import { Token } from "../entities/Token.entity";
import { IUser } from "../interfaces/user.interface";

class TokenService {
  private tokenRepository: ITokenRepository;
  private defaultExpirationMinutes = 5;

  constructor(tokenRepository: ITokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  // Generate a token of a given length
  generateToken(length: number): string {
    return crypto.randomBytes(length).toString("hex");
  }

  // Save a new token with a default expiration of 5 minutes
  async createToken(
    user: IUser,
    type: string,
    length: number,
    expiration?: Date
  ) {
    const tokenValue = this.generateToken(length);

    const tokenExpiration =
      expiration ||
      new Date(Date.now() + this.defaultExpirationMinutes * 60 * 1000); // 5 minutes

    await this.tokenRepository.createToken({
      token: tokenValue,
      type,
      user,
      expiration: tokenExpiration,
      isUsed: false,
    });
    return tokenValue;
  }

  // Verify a token
  async verifyToken(token: string, type: string): Promise<Token | null> {
    return this.tokenRepository.findToken(token, type);
  }

  // Invalidate a token
  async invalidateToken(token: string): Promise<void> {
    return this.tokenRepository.invalidateToken(token);
  }
}

export default TokenService;
