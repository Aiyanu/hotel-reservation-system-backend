import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { IToken } from "../interfaces/token.interface";
import { User } from "./User.entity";

@Entity()
export class Token implements IToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  code!: string;

  @Column({ type: "varchar", length: 50 })
  type!: string; // e.g., 'authentication', 'email-verification', 'phone-verification'

  @Column({ type: "timestamp" })
  expiration!: Date;

  @Column({ type: "boolean", default: false })
  isUsed!: boolean;

  @ManyToOne(() => User, (user) => user.tokens)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
