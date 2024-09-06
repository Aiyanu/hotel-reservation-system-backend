import { FindOptionsWhere } from "typeorm";
import { Token } from "../entities/Token.entity";
import { IUser } from "./user.interface";

export interface IToken {
  id: number;
  code: string;
  type: string;
  expiration: Date;
  isUsed: boolean;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenCreationBody
  extends Omit<IToken, "id" | "createdAt" | "updatedAt"> {}

export interface IFindTokenQuery {
  where: FindOptionsWhere<Token> | FindOptionsWhere<Token>[]; // Specify the conditions to find the token
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof IToken]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface ITokenRepository {
  findToken(token: Partial<ITokenCreationBody>): Promise<Token | null>;
  createToken(tokenData: ITokenCreationBody): Promise<IToken>;
  invalidateToken(token: Partial<ITokenCreationBody>): Promise<void>;
}
